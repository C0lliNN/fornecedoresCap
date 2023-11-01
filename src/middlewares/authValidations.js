const { body, param } = require("express-validator");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const newUser = [
  body("name")
    .isString()
    .withMessage("Nome deve ser um texto")
    .isLength({ min: 3, max: 255 })
    .withMessage("Nome deve conter mais de 3 caracteres e menos que 255.")
    .custom(async (value) => {
      const user = await User.findOne({ name: value });

      if (user)
        throw new Error(
          `Usuário com o nome: ${value}, já cadastrado no banco de dados.`
        );
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("E-mail valido obrigatório.")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user)
        throw new Error(
          `Usuário com o e-mail ${value}, já cadastrado no banco de dados.`
        );
      return true;
    }),
  body("password")
    .isStrongPassword()
    .withMessage("Senha deve ser forte para criar um novo usuário."),
  body("confirmPassword")
    .isString()
    .withMessage("Confirmação de senha é obrigatória.")
    .custom((value, { req }) => {
      if (value != req.body.password)
        throw new Error("As senhas devem ser iguais.");
      return true;
    }),
];

const login = [
  body("name").custom(async (value) => {
    const user = await User.findOne({ name: value });
    if (!user)
      throw new Error(
        `Usuário ${user}, não encontrado no banco de dados, contate o administrador.`
      );
  }),
];

const editUser = [
  param("id").custom(async (value) => {
    if (!new mongoose.Types.ObjectId(value))
      throw new Error("Id fornecido não é do tipo MongooseType");
    const user = await User.findById(value);
    if (!user)
      throw new Error(`Usuário id: ${value}, não existe no banco de dados!`);
    return true;
  }),
  body("name")
    .optional()
    .isString()
    .withMessage("Nome deve ser um texto")
    .isLength({ min: 3, max: 255 })
    .withMessage("Nome deve conter mais de 3 caracteres e menos que 255.")
    .custom(async (value) => {
      const user = await User.findOne({ name: value });

      if (user)
        throw new Error(
          `Usuário com o nome: ${value}, já cadastrado no banco de dados.`
        );
      return true;
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("E-mail valido obrigatório.")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user)
        throw new Error(
          `Usuário com o e-mail ${value}, já cadastrado no banco de dados.`
        );
      return true;
    }),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage("Senha deve ser forte para criar um novo usuário."),
];

const deleteUser = [
  param("id").custom(async (value) => {
    if (!new mongoose.Types.ObjectId(value))
      throw new Error("Id fornecido não é do tipo MongooseType");
    const user = await User.findById(value);
    if (!user)
      throw new Error(`Usuário id: ${value}, não existe no banco de dados!`);
    return true;
  }),
];

module.exports = { newUser, editUser, login, deleteUser };
