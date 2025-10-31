import Pokemon from "../database/models/pokemon.model.mjs";

export const searchPokemons = async (req, res, next) => {
  const limit = Number.parseInt(req.query?.limit ) || 15;
  const page = Number.parseInt(req.query?.page) || 1;
  const offset = (page - 1) * limit;

  const { name, type, id } = req.query;
  
  const filter = {};

  if (name)
    filter.name = toRegex(name);
  if (type)
    filter.type = toRegex(type)
  if (id)
    filter.id = toRegex(id); 

  try {
    const [
      totalItems,
      pokemons,
    ] = await Promise.all([
      Pokemon.countDocuments(filter),
      Pokemon.find(filter)
        .skip(offset)
        .limit(limit),
    ]);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit) || 1,
      totalItems,
      pokemons,
    })
  } catch (error) {
    next(error);
  }

}

const toRegex = (str) => new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');