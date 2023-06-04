import mongoose from 'mongoose';

const { Schema } = mongoose;

const tagsSchema = new Schema({
  usuario: String,
  tag: String,
  amigo: String,
  juego: Number,
  region: String
});

const tagsModel = mongoose.model('tags', tagsSchema);

export default tagsModel;