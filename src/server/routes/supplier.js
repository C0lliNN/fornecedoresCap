const router = require("express").Router();
const AuthGuard = require("../../middlewares/authGuard");
const AuthAdminGuard = require("../../middlewares/authAdminGuard");
const SupplierController = require("../../controllers/supplierSheetController");
const uploadXlsx = require("../../middlewares/importFiles");

const supplier = new SupplierController();

router.get("/", AuthGuard, supplier.getData);
router.post(
  "/import",
  AuthAdminGuard,
  uploadXlsx.single("xlsx-file"),
  supplier.importData
);
router.get("/export", AuthAdminGuard, supplier.exportData);

module.exports = router;
