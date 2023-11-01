const xlsx = require("xlsx");
const axios = require("axios");

class SupplierService {
  getData = async () => {
    const res = await axios.get("../data/relatorio.xlsx");

    const wb = xlsx.readFile(res.data);
    const fornecedoresPlan = wb.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(wb.Sheets[fornecedoresPlan]);

    return data;
  };
}

module.exports = SupplierService;
