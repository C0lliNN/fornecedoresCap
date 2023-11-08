const SuppliersService = require("../services/suppliersService");

class SupplierSheetController {
  constructor() {
    this.supplier = new SuppliersService();
  }

  importData = async (req, res) => {
    await this.supplier.importData(req.file.buffer);

    return res.status(201);
  };

  exportData = async (req, res) => {
      const data = await this.supplier.exportData();
      return res.status(200).json(data);
  };

  getData = async (req, res) => {
    const data = await this.supplier.getData();
    return res.status(200).json(data);
  };
}

module.exports = SupplierSheetController;
