import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mediapp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));

db.once('open',function(){
  console.log("Conexão com o Database estabelecida com sucesso!");
});

export default db;


