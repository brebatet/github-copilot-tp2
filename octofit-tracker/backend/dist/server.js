"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
function registerCollectionRoutes(collection) {
    const route = `/api/${collection}/`;
    const itemRoute = `/api/${collection}/:id`;
    const model = models_1.models[collection];
    const label = models_1.labels[collection];
    function getValidId(id, res) {
        if (Array.isArray(id) || !mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ error: `Invalid ${label} id` });
            return null;
        }
        return id;
    }
    app.get(route, async (_req, res) => {
        try {
            const sort = collection === 'leaderboard' ? { score: 'desc' } : { createdAt: 'desc' };
            const documents = await model.find().sort(sort).lean();
            res.json(documents);
        }
        catch (error) {
            res.status(500).json({ error: `Failed to load ${collection}` });
        }
    });
    app.post(route, async (req, res) => {
        try {
            const document = await model.create(req.body);
            res.status(201).json(document);
        }
        catch (error) {
            res.status(400).json({ error: `Failed to create ${label}` });
        }
    });
    app.get(itemRoute, async (req, res) => {
        const id = getValidId(req.params.id, res);
        if (!id) {
            return;
        }
        try {
            const document = await model.findById(id).lean();
            if (!document) {
                res.status(404).json({ error: `${label} not found` });
                return;
            }
            res.json(document);
        }
        catch (error) {
            res.status(500).json({ error: `Failed to load ${label}` });
        }
    });
    app.put(itemRoute, async (req, res) => {
        const id = getValidId(req.params.id, res);
        if (!id) {
            return;
        }
        try {
            const document = await model.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!document) {
                res.status(404).json({ error: `${label} not found` });
                return;
            }
            res.json(document);
        }
        catch (error) {
            res.status(400).json({ error: `Failed to update ${label}` });
        }
    });
    app.delete(itemRoute, async (req, res) => {
        const id = getValidId(req.params.id, res);
        if (!id) {
            return;
        }
        try {
            const document = await model.findByIdAndDelete(id);
            if (!document) {
                res.status(404).json({ error: `${label} not found` });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: `Failed to delete ${label}` });
        }
    });
}
;
['users', 'teams', 'activities', 'leaderboard', 'workouts'].forEach(registerCollectionRoutes);
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        apiUrl: baseUrl,
        mongo: mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});
async function start() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB connected: ${mongoUri}`);
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
    app.listen(port, () => {
        console.log(`API running on ${baseUrl}`);
    });
}
void start();
