import  PaginationUtilities from "../../core/utilities/pagination.utilities.mjs";
import LikeService from "../like/like.service.mjs";
import Pokemon from "./pokemon.model.mjs";

export default class PokemonService {
  static getAll(reqQuery) {
    const filter = this.#createFilterFromQuery(reqQuery);
    return this.#getPaginatedPokemons(filter, reqQuery);
  }
  
  static filterAll(reqQuery) {
    const filter = this.#createFilterFromQuery(reqQuery);
    return this.#getPaginatedPokemons(filter, reqQuery);
  }

  static async filterLiked(reqQuery) {
    const likedIds = await LikeService.getByUserId(reqQuery.userId);
    const filter = { _id: { $in: likedIds } };
    return this.#getPaginatedPokemons(filter, reqQuery);
  }

  static async #getPaginatedPokemons(filter, reqQuery) {
    const {
      limit,
      page,
      offset
    } = PaginationUtilities.parsePagination(reqQuery);

    const [
      totalItems,
      pokemons,
    ] = await Promise.all([
      Pokemon.countDocuments(filter),
      Pokemon.find(filter)
        .skip(offset)
        .limit(limit),
    ]);
    return {
      currentPage: page,
      totalItems,
      totalPages: Math.ceil(totalItems / limit) || 1,
      pokemons,
    };
  }

  static #createFilterFromQuery(query) {
    const { name, type, id } = query;
    const filter = {};

    if (name)
      filter.name = this.#toRegex(name);
    if (type)
      filter.type = this.#toRegex(type);
    if (id)
      filter.id = this.#toRegex(id);

    return filter;
  }

  static #toRegex(str) {
    return new RegExp(str.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  }
}
