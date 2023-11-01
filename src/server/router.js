const router = require("express").Router();
const authRoutes = require("./routes/auth");
const supplierRoutes = require("./routes/supplier");

router.use("/auth", authRoutes);
router.use("/suppliers", supplierRoutes);
router.get("/", (req, res) =>
  res.status(200).json({ msg: "API De fornecedores CAP rodando." })
);
module.exports = router;
