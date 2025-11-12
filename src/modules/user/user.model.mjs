import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const { SALT_ROUNDS } = process.env;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  }
}, {
  timestamps: true,
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(+SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
})

UserSchema.method('comparePassword', async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
});

export default model('User', UserSchema);