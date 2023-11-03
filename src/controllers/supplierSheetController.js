const SuppliersService = require("../services/suppliersService");

class SupplierSheetController {
  constructor() {
    this.supplier = new SuppliersService();
  }

  importData = async (req, res) => {
    try {
      const data = await this.supplier.importData(req.file.buffer);
      return res.status(201).json({
        payload: {
          status: "Success",
          message: "Dados importados com sucesso.",
          data,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          errors: error.message,
        },
      });
    }
  };

  exportData = async (req, res) => {
    try {
      const data = await this.supplier.exportData();
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "Dados exportados com sucesso.",
          url: data,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          errors: error.message,
        },
      });
    }
  };

  getData = async (req, res) => {
    try {
      const data = await this.supplier.getData();
      return res.status(200).json({
        payload: {
          status: "Success",
          message: "Dados coletados com sucesso.",
          data,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        payload: {
          status: "Failed",
          errors: error.message,
        },
      });
    }
  };
}

module.exports = SupplierSheetController;
