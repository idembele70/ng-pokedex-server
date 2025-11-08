import User from "../database/models/user.model.mjs"
import jwt from 'jsonwebtoken';

const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_DURATION,
  REFRESH_TOKEN_DURATION,
} = process.env;

export const registerController = async (req, res, next) => {
  try {
   const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      message: 'User created successfully',
      user : {
        id: user._id,
        email: user.email,
      }
    })
  } catch (error) {
    next(error);
  }
}

export const loginController = async (req, res, next) => {
  try {
    const user = await User.findOne(
      { email: req.body.email, }
    ).select('+password');;

    const passwordMatch = await user.comparePassword(req.body.password)
    if (!user || !passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_DURATION });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_DURATION });

    const refreshTokenDuration = Number.parseInt(REFRESH_TOKEN_DURATION);
    const
      oneDayInHour = 24,
      oneHourInMinute = 60,
      oneMinuteInSecond = 60,
      oneSecondInMS = 1000;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/api/v1/auth/refresh',
      maxAge: refreshTokenDuration * oneDayInHour * oneHourInMinute * oneMinuteInSecond * oneSecondInMS,
    })

    res.status(200).json({ accessToken, ...payload });

  } catch (error) {
    next(error);
  }
}

export const refreshTokenController = async (req, res, next) => {
  try { 
    const refreshToken = req.cookies?.['refreshToken'];

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
      },
      JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_DURATION,
      }
    );

    res.status(200).json({ accessToken: newAccessToken });

  } catch (error) {
    if (error.message === 'jwt expired')
      return next(new Error('refresh token expired'));
    next(error);
  }
}

export const meController = async (req, res, next) => {
  try {
    res.status(200).json({
      userId: req.user.userId,
      email: req.user.email,
    });
  } catch (error) {
    next(error);
  }
}