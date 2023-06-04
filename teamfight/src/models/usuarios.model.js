import mongoose from 'mongoose';

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  usuario: String,
  league: String,
  servidor: String,
  siege: String,
  plataforma: String,
  email: String,
  passw: String,
  favoritos: String
});

const usuariosModel = mongoose.model('usuarios', usuarioSchema);

export default usuariosModel;