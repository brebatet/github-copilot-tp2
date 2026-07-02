import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = Number(process.env.PORT) || 8000
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

async function start() {
  try {
    await mongoose.connect(mongoUri)
    console.log(`MongoDB connected: ${mongoUri}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }

  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
  })
}

void start()
