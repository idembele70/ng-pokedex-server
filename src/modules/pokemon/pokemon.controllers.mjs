import PokemonService from "./pokemon.service.mjs";

export default class PokemonControllers {
  static async getAll(req, res, next) {
    try {
      const result = await PokemonService.getAll(req.query);
      res
        .status(200)
        .json(result);
    } catch (error) {
      next(error);
    }
  }

  static async filterAll(req, res, next) {
    try {
      const result = await PokemonService.filterAll(req.query);
      res
        .status(200)
        .json(result);
    } catch (error) {
      next(error);
    }
  }
}