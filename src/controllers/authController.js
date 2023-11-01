const UserService = require("../services/userService");

class AuthController {
  constructor() {
    this.user = new UserService();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.user.getUsers();
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "Users getted with success.",
          users,
        },
      });
    } catch (error) {
      return res.status(501).json({
        payload: {
          status: "Failed",
          errors: error.message,
        },
      });
    }
  };

  login = async (req, res) => {
    try {
      const token = await this.user.login(req.body);
      return res.status(200).json({
        payload: {
          status: "Sucess",
          message: "Usuário logado com sucesso.",
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: error.message },
        },
      });
    }
  };

  newUser = async (req, res) => {
    try {
      const token = await this.user.createUser();
      return res.status(201).json({
        payload: {
          status: "Success",
          message: "Usuário criado com sucesso!",
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: "Falha ao criar novo usuário." },
        },
      });
    }
  };

  editUser = async (req, res) => {
    try {
      await this.user.adminEditUser(req.params.id, req.body);
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "Usuário editado com sucesso.",
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          errors: {
            msg: error.message.includes("No data inserted.")
              ? error.message
              : "Falha ao editar o usuário, tente novamento mais tarde.",
          },
        },
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      await this.user.deleteUser(req.params.id);
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "Usuário deletado com sucesso.",
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        payload: {
          status: "Failed",
          errors: { msg: "Falha ao deletar usuário." },
        },
      });
    }
  };
}
