import mongoose, { model, Schema } from "mongoose";

const LikeSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  pokemonId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Pokemon',
  },
},
{
  timestamps: true,
}
);

LikeSchema.index({ userId: 1, pokemonId: 1}, { unique: true });

export default model('Like', LikeSchema);