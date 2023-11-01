const SuppliersService = require("../services/suppliersService");

class SupplierSheetController {
  constructor() {
    this.supplier = new SuppliersService();
  }

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
