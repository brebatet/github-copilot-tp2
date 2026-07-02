import express from 'express'
import mongoose, { type SortOrder } from 'mongoose'
import { connectDatabase, mongoUri } from './config/database'
import { type ApiCollection, labels, models } from './models'

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

function registerCollectionRoutes(collection: ApiCollection) {
  const route = `/api/${collection}/`
  const itemRoute = `/api/${collection}/:id`
  const model = models[collection]
  const label = labels[collection]

  function getValidId(id: string | string[], res: express.Response) {
    if (Array.isArray(id) || !mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: `Invalid ${label} id` })
      return null
    }

    return id
  }

  app.get(route, async (_req, res) => {
    try {
      const sort: Record<string, SortOrder> = collection === 'leaderboard' ? { score: 'desc' } : { createdAt: 'desc' }
      const documents = await model.find().sort(sort).lean()
      res.json(documents)
    } catch (error) {
      res.status(500).json({ error: `Failed to load ${collection}` })
    }
  })

  app.post(route, async (req, res) => {
    try {
      const document = await model.create(req.body)
      res.status(201).json(document)
    } catch (error) {
      res.status(400).json({ error: `Failed to create ${label}` })
    }
  })

  app.get(itemRoute, async (req, res) => {
    const id = getValidId(req.params.id, res)
    if (!id) {
      return
    }

    try {
      const document = await model.findById(id).lean()
      if (!document) {
        res.status(404).json({ error: `${label} not found` })
        return
      }

      res.json(document)
    } catch (error) {
      res.status(500).json({ error: `Failed to load ${label}` })
    }
  })

  app.put(itemRoute, async (req, res) => {
    const id = getValidId(req.params.id, res)
    if (!id) {
      return
    }

    try {
      const document = await model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!document) {
        res.status(404).json({ error: `${label} not found` })
        return
      }

      res.json(document)
    } catch (error) {
      res.status(400).json({ error: `Failed to update ${label}` })
    }
  })

  app.delete(itemRoute, async (req, res) => {
    const id = getValidId(req.params.id, res)
    if (!id) {
      return
    }

    try {
      const document = await model.findByIdAndDelete(id)
      if (!document) {
        res.status(404).json({ error: `${label} not found` })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: `Failed to delete ${label}` })
    }
  })
}

;(['users', 'teams', 'activities', 'leaderboard', 'workouts'] as ApiCollection[]).forEach(
  registerCollectionRoutes
)

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiUrl: baseUrl,
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

async function start() {
  try {
    await connectDatabase()
    console.log(`MongoDB connected: ${mongoUri}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }

  app.listen(port, () => {
    console.log(`API running on ${baseUrl}`)
  })
}

void start()
