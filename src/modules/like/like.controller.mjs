import LikeService from "./like.service.mjs";

export default class LikeController {
  static async add(req, res, next) {
    try {
      await LikeService.add({
        ...req.params,
        ...req.user,
      });
      res
        .status(200)
        .json({
          liked: true,
        });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await LikeService.delete({
        ...req.params,
        ...req.user,
      });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}