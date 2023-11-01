const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const UserModel = require("../models/userModel");

function AuthGuard(req, res, next) {
  const header = req.headers["authorization"];
  const token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          payload: {
            status: "Failed",
            message: "Token invalido!",
          },
        });
      } else {
        const user = await UserModel.findById(decodedToken.id).select(
          "-password"
        );
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({
      payload: {
        status: "Failed",
        message: "Você precisa está autenticado para acessar está rota!",
      },
    });
  }
}
module.exports = AuthGuard;
