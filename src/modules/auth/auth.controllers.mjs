import AuthService from "./auth.service.mjs";

export const registerController = async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (error) {
    next(error);
  }
}

export const loginController = async (req, res, next) => {
  try {
    const {
      accessToken,
      payload,
      refreshToken,
      refreshTokenCookieOptions,
    } = await AuthService.login(req.body);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    res.status(200).json({ accessToken, ...payload });

  } catch (error) {
    next(error);
  }
}

export const refreshTokenController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.['refreshToken'];
    const newAccessToken = await AuthService.refreshToken(refreshToken);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    if (error.message === 'jwt expired'){
      // TODO logout
    }
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

export const logoutController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.['refreshToken'];

    res.clearCookie('refreshToken', AuthService.REFRESH_TOKEN_DEFAULT_COOKIE_OPTIONS);
    await AuthService.logout(refreshToken);  

    res.status(200).json({ message: 'Logged out!' });
  } catch (error) {
    next(error);
  }
}