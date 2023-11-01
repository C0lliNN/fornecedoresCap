const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

class UserService {
  getUsers = async () => {
    const users = await User.find();

    return users;
  };

  createUser = async (credentials) => {
    const { name, email, password } = credentials;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: passwordHash });
    const user = await User.findOne({ email: email }).select("-password");

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "12h" });
    return token;
  };

  login = async (credentials) => {
    const { name, password } = credentials;

    const user = await User.findOne({ name: name });

    const verifiedUser = await bcrypt.compare(password, user.password);

    if (!verifiedUser) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      { expiresIn: "12h" }
    );
    return token;
  };

  editUser = async (id, credentials) => {
    const { email, password, name } = credentials;
    const userRefreshed = await User.findById(id);
    if (!credentials) throw new Error("No data inserted.");

    if (name) userRefreshed.name = name;

    if (email) userRefreshed.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      userRefreshed.password = passwordHash;
    }

    await userRefreshed.save();
  };

  deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
  };
}

module.exports = UserService;
