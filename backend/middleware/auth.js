const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

// Middleware de autenticación OPCIONAL
// Añade req.user si hay token válido, pero no bloquea la request si no hay token
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      req.user = null;
      return next();
    }

    const user = await User.findById(decoded.userId).select('-password');
    req.user = user;
    
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

// Middleware de autenticación REQUERIDA
// Bloquea la request si no hay token válido
const requireAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = {
  optionalAuth,
  requireAuth
};
