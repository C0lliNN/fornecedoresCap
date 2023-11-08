const mongoose = require("mongoose");

class Database {
  constructor() {
    this.uri = process.env.DB_URI;
  }

  start = async () => {
    try {
      await mongoose.connect(this.uri);
      console.log("Concetado com o banco de dados")
    } catch(error) {
      console.log("Erro ao conectar o banco de dados" + error)
    }
  };
}

module.exports = Database;
