const jwt = require('jsonwebtoken');
const jwtSecret = "MynameisHariompatelIloveyou";

const authMiddleware = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ "error_token_empty" : 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.userId; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;