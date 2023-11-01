require("dotenv").config();
const express = require("express");
const cors = require("cors");
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
    await this.db
      .start()
      .then(() =>
        this.app.listen(this.port, () =>
          console.log("servidor rodando na porta " + this.port)
        )
      )
      .catch((error) => console.log(error));
  };
}

module.exports = Server;
