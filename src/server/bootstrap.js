require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const db = require("../config/db");
const bodyParser = require("body-parser");
const router = require("../server/router");

class Server {
  constructor() {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(router);

    this.port = process.env.PORT;
    this.db = new db();
  }

  start = async () => {
    try {
      await this.db.start();
      await new Promise((resolve, reject) => {
        this.app.listen(this.port, resolve).on("error", reject);
      });

      console.log("servidor rodando na porta " + this.port);
    } catch (error) {
      console.log("Erro ao iniciar o servidor" + error);
    }
  };
}

module.exports = Server;
