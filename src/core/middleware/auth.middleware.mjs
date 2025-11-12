import jwt from 'jsonwebtoken';

const {
  JWT_SECRET,
} = process.env;

export const authMiddleware = (req, _res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new Error('Missing Token'));

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}