import  PaginationUtilities from "../../core/utilities/pagination.utilities.mjs";
import Pokemon from "./pokemon.model.mjs";

export default class PokemonService {
  static getAll(query) {
    return this.#getPaginatedPokemons({
      page: query.page,
      limit: query.limit,
    });
  }

  static filterAll(query) {
  return this.#getPaginatedPokemons(query)
  }

  static async #getPaginatedPokemons(query) {
    const {
      limit,
      page,
      offset
    } = PaginationUtilities.parsePagination(query);
    const { name, type, id } = query;
    const filter = {};

    if (name)
      filter.name = this.#toRegex(name);
    if (type)
      filter.type = this.#toRegex(type);
    if (id)
      filter.id = this.#toRegex(id);

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

  static #toRegex(str) {
    return new RegExp(str.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  }
}
