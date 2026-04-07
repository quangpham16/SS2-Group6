const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authorizationHeader = req.headers.authorization || '';
  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      email: payload.email,
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired authorization token.' });
  }
}

module.exports = requireAuth;
