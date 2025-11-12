import Pokemon from "../pokemon/pokemon.model.mjs";
import Like from "./like.model.mjs";

export default class LikeService {
  static add(payload) {
    const { userId, pokemonId } = payload;

    return Promise.all([
      Like.create({
        userId,
        pokemonId,
      }),
      Pokemon.findByIdAndUpdate(pokemonId,
        {
          $inc: { likeCount: 1 }
        }
      )
    ]);
  }

  static delete(payload) {
    const { userId, pokemonId } = payload;

    return Promise.all([
      Like.findOneAndDelete({
        userId,
        pokemonId,
      }),
      Pokemon.findByIdAndUpdate(pokemonId, {
        $inc: { likeCount: -1 }
      })
    ])
  }
}