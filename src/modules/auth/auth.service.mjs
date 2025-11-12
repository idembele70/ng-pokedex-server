import jwt from 'jsonwebtoken';
import { env } from "../../config/env.mjs";
import User from "../user/user.model.mjs";
import { BlacklistedRefreshToken } from './auth.model.mjs';

export default class AuthService {
  static REFRESH_TOKEN_DEFAULT_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/api/v1/auth/',
    maxAge: 0,
  };

  static register(input) {
    return User.create({
      email: input.email,
      password: input.password,
    })
  }

  static async login(input) {
    const user = await User.findOne(
      { email: input.email },
    ).select('+password');

    await user.comparePassword(input.password);

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.ACCESS_TOKEN_DURATION });

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_TOKEN_DURATION });

    const refreshTokenDuration = Number.parseInt(env.REFRESH_TOKEN_DURATION);
    const
      oneDayInHour = 24,
      oneHourInMinute = 60,
      oneMinuteInSecond = 60,
      oneSecondInMS = 1000;
    const maxAge = refreshTokenDuration *
      oneDayInHour * oneHourInMinute * oneMinuteInSecond * oneSecondInMS;

    const refreshTokenCookieOptions = {
      ...this.REFRESH_TOKEN_DEFAULT_COOKIE_OPTIONS,
      maxAge,
    };

    return {
      accessToken,
      payload,
      refreshToken,
      refreshTokenCookieOptions,
    };
  }

  static async refreshToken(refreshToken) {
   const exist = await BlacklistedRefreshToken.findOne({
      token: refreshToken,
    });

    if (exist)  {
      throw new Error("Token is blacklisted");
    }
      
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.ACCESS_TOKEN_DURATION,
      }
    );
    return newAccessToken;
  }

  static async logout(refreshToken) {
    const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

    await BlacklistedRefreshToken.create({
      token: refreshToken,
      userId: payload.userId,
      expiresAt: payload.exp,
    });
  }
}