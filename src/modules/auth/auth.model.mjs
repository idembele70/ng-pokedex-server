import { model, Schema } from "mongoose";

const BlacklistedRefreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  blacklistedAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Number,
    required: true,
  },
});

export const BlacklistedRefreshToken = model('BlacklistedRefreshToken', BlacklistedRefreshTokenSchema);