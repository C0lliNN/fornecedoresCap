function AuthAdminGuard(req, res, next) {
  const user = req.user;
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

module.exports = AuthAdminGuard;
