const UserService = require("../services/userService");

class AuthController {
  constructor() {
    this.user = new UserService();
  }

  getUsers = async (req, res) => {
    const users = await this.user.getUsers();
    res.status(200).json(users);
  };

  getUser = async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
  };

  login = async (req, res) => {
    const token = await this.user.login(req.body);
    return res.status(200).json(token);
  };

  newUser = async (req, res) => {
    const token = await this.user.createUser(req.body);
    return res.status(201).json(token);
  };

  editUser = async (req, res) => {
    await this.user.editUser(req.params.id, req.body);
    return res.status(200);
  };

  deleteUser = async (req, res) => {
    await this.user.deleteUser(req.params.id);
    return res.status(200);
  };
}

module.exports = AuthController;
