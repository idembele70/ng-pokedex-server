export const getHealth = (_req, res, next) => {
  try {
    res
      .status(200)
      .json({
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date().toISOString(),
      });
  } catch (error) {
    next(error);
  }
}