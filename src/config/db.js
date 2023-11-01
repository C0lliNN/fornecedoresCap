const mongoose = require("mongoose");
class Database {
  constructor() {
    this.user = process.env.DB_USER;
    this.uri = process.env.DB_URI;
    this.pass = process.env.DB_PASS;
  }

  start = async () => {
    await mongoose
      .connect(`mongodb+srv://${this.user}:${this.pass}@${this.uri}`)
      .then(() => console.log("Concetado com o banco de dados"))
      .catch((error) =>
        console.log("Erro ao conectar o banco de dados" + error)
      );
  };
}

module.exports = Database;
