import Pokemon from "../pokemon/pokemon.model.mjs";
import Like from "./like.model.mjs";

export default class LikeService {
  static async add(payload) {
    const { userId, pokemonId } = payload;

    const like = await Like.create({
        userId,
        pokemonId,
      });

      if (!like) {
        return;
      }

      await Pokemon.findByIdAndUpdate(pokemonId,
        {
          $inc: { likeCount: 1 }
        })
  }

  static async delete(payload) {
    const { userId, pokemonId } = payload;

    const deleted = await Like.findOneAndDelete({
      userId,
      pokemonId,
    });

    if (!deleted) {
      throw new Error('Cannot remove nonexistent like');
    }

    await Pokemon.findByIdAndUpdate(pokemonId, {
      $inc: { likeCount: -1 }
    });
  }
}