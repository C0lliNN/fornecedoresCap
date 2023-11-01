const router = require("express").Router();
const AuthGuard = require("../../middlewares/authGuard");
const SupplierController = require("../../controllers/supplierSheetController");

const supplier = new SupplierController();

router.get("/", AuthGuard, supplier.getData);

module.exports = router;
