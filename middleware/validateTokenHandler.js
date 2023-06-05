const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(401);
    throw new Error('Authentication failed. No token provided.');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Authentication failed. Invalid token.');
  }
};

module.exports = authenticateToken;
