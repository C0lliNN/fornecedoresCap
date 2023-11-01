const xlsx = require("xlsx");
const path = require("path");

class SupplierService {
  getData = async () => {
    const filePath = path.join(__dirname, "..", "data", "relatorio.xlsx");

    const wb = xlsx.readFile(filePath);
    const fornecedoresPlan = wb.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(wb.Sheets[fornecedoresPlan]);

    return data;
  };
}

module.exports = SupplierService;
