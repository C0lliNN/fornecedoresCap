const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const secret = process.env.SECRET;

function AuthAdminGuard(req, res, next) {
  const headerToken = req.headers["authorization"];
  if (!headerToken)
    return res.status(401).json({
      payload: {
        status: "Failed",
        message: "Nenhum token informado!",
      },
    });
  const token = headerToken.split(" ")[1];

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
        if (!user.admin) {
          return res.status(401).json({
            payload: {
              status: "Failed",
              message: "Você não é autorizado para realizar essa requisição!",
            },
          });
        }
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json("You are note signed or your token is invalid.");
  }
}

module.exports = AuthAdminGuard;
