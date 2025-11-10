const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Question = require('./models/Question');
const Result = require('./models/Result');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas

// Obtener preguntas por tema
app.get('/api/questions/:topic', async (req, res) => {
  try {
    const { topic } = req.params;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50); // Máximo 50 preguntas
    
    let query = {};
    if (topic !== 'mixed') {
      query.topic = topic;
    }
    
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: limit } }
    ]);
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los temas disponibles
app.get('/api/topics', async (req, res) => {
  try {
    const topics = await Question.distinct('topic');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guardar resultado
app.post('/api/results', async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener historial de resultados
app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ completedAt: -1 })
      .limit(10);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
