const express = require('express');
const router = express.Router();
const UserScore = require('../models/UserScore');
const { requireAuth } = require('../middleware/auth');

// POST /api/scores - Guardar un nuevo score (requiere autenticación)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { topic, questionCount, correctAnswers, timeInSeconds } = req.body;

    if (!topic || !questionCount || correctAnswers === undefined || !timeInSeconds) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const percentage = Math.round((correctAnswers / questionCount) * 100);

    const score = new UserScore({
      userId: req.user._id,
      topic,
      questionCount,
      correctAnswers,
      percentage,
      timeInSeconds
    });

    await score.save();

    res.status(201).json({ score });
  } catch (error) {
    console.error('Error guardando score:', error);
    res.status(500).json({ error: 'Error al guardar score' });
  }
});

// GET /api/scores/my-best - Obtener mejores scores del usuario actual por categoría
router.get('/my-best', requireAuth, async (req, res) => {
  try {
    const scores = await UserScore.aggregate([
      { $match: { userId: req.user._id } },
      { $sort: { percentage: -1, timeInSeconds: 1 } },
      { 
        $group: {
          _id: '$topic',
          bestScore: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: '$bestScore' } },
      { $sort: { topic: 1 } }
    ]);

    res.json({ scores });
  } catch (error) {
    console.error('Error obteniendo mejores scores:', error);
    res.status(500).json({ error: 'Error al obtener scores' });
  }
});

// GET /api/scores/ranking/:topic - Obtener ranking global de un topic
router.get('/ranking/:topic', async (req, res) => {
  try {
    const { topic } = req.params;
    const limit = parseInt(req.query.limit) || 100;

    // Obtener el mejor score de cada usuario para este topic
    const ranking = await UserScore.aggregate([
      { $match: { topic } },
      { $sort: { percentage: -1, timeInSeconds: 1 } },
      {
        $group: {
          _id: '$userId',
          bestScore: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: '$user.name',
          avatar: '$user.avatar',
          percentage: '$bestScore.percentage',
          correctAnswers: '$bestScore.correctAnswers',
          questionCount: '$bestScore.questionCount',
          timeInSeconds: '$bestScore.timeInSeconds',
          completedAt: '$bestScore.completedAt'
        }
      },
      { $sort: { percentage: -1, timeInSeconds: 1 } },
      { $limit: limit }
    ]);

    res.json({ ranking });
  } catch (error) {
    console.error('Error obteniendo ranking:', error);
    res.status(500).json({ error: 'Error al obtener ranking' });
  }
});

module.exports = router;
