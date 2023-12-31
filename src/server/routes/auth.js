const router = require("express").Router();
const authController = require("../../controllers/authController");
const authAdminGuard = require("../../middlewares/authAdminGuard");
const {
  newUser,
  editUser,
  deleteUser,
  login,
} = require("../../middlewares/authValidations");
const validator = require("../../middlewares/validator");
const AuthGuard = require("../../middlewares/authGuard");

const auth = new authController();

router.post("/login", login, validator, auth.login);
router.post("/register", authAdminGuard, newUser, validator, auth.newUser);
router.put("/editUser/:id", authAdminGuard, editUser, validator, auth.editUser);
router.delete("/:id", authAdminGuard, deleteUser, validator, auth.deleteUser);
router.get("/users", authAdminGuard, auth.getUsers);
router.get("/user", AuthGuard, auth.getUser);

module.exports = router;
