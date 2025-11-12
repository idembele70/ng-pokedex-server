import { model, Schema } from 'mongoose';

const StatsSchema = new Schema({
  hp: Number,
  attack: String,
  defense: String,
  spattack: String,
  spdefense: String,
  speed: String,
});

const MoveSchema = new Schema({
  learnedat: { type: String, default: '' },
  name: String,
  gen: { type: String, default: 'V' },
});

const MovesSchema = new Schema({
  level: [MoveSchema],
  tmhm: [MoveSchema],
  egg: [MoveSchema],
  tutor: [MoveSchema],
  gen34: [{
    name: { type: String },
    method: { type: String },
  }],
});

const DamagesSchema = new Schema({
  normal: String,
  fire: String,
  water: String,
  electric: String,
  grass: String,
  ice: String,
  fight: String,
  poison: String,
  ground: String,
  flying: String,
  psychic: String,
  bug: String,
  rock: String,
  ghost: String,
  dragon: String,
  dark: String,
  steel: String,
});

const MiscSchema = new Schema({
  sex: {
    male: String,
    female: String
  },
  abilities: {
    normal: [String],
    hidden: [String],
  },
  classification: String,
  height: String,
  weight: String,
  capturerate: String,
  eggsteps: String,
  expgrowth: String,
  happiness: String,
  evpoints: [String],
  fleelfag: String,
  entreeforestlevel: String,
});

const PokemonSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  img: String,
  type: [String],
  likeCount: { type: Number, default: 0 },
  stats: { type: StatsSchema, select: false },
  moves: { type: MovesSchema, select: false },
  damages: { type: DamagesSchema, select: false },
  misc: { type: MiscSchema, select: false },
},
  {
    timestamps: true,
  }
);

export default model('Pokemon', PokemonSchema);