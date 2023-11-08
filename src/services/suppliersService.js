const xlsx = require("xlsx");
const SupplierModel = require("../models/supplierModel");
const s3 = require("../config/s3");

const {
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

class SupplierService {
  importData = async (file) => {
    const wb = xlsx.read(file, { type: "buffer" });
    const suppliersPlan = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(suppliersPlan);

    await SupplierModel.deleteMany({});
    await SupplierModel.insertMany(data);
  };
  exportData = async () => {
    const data = await SupplierModel.find();

    const transformedData = data.map((value) => ({
      _id: value._id,
      ["Registro Fiscal"]: value["Registro Fiscal"],
      ["Razão Social"]: value["Razão Social"],
      ["Nome Formulário"]: value["Nome Formulário"],
      Status: value.Status,
      ["Nome Fantasia"]: value["Nome Fantasia"],
      País: value.País,
      Estado: value.Estado,
      Cidade: value.Cidade,
      Contato: value.Contato,
      ["Conta de Pagamento"]: value["Conta de Pagamento"],
      Categoria: value.Categoria,
      ["Tipo de Serviço"]: value["Tipo de Serviço"],
      ["Tipo de Produto"]: value["Tipo de Produto"],
      ["Contato Imediato"]: value["Contato Imediato"],
      Email: value.Email,
      Telefone: value.Telefone,
      ["Nível de Atendimento"]: value["Nível de Atendimento"],
    }));

    const supplierPlan = xlsx.utils.json_to_sheet(transformedData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, supplierPlan, "FornecedoresCAP");

    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    const fileName = new Date().getTime() + "_Fornecedores.xlsx";

    const params = {
      Bucket: "fornecedores-cap",
      Key: fileName,
      Body: buffer,
    };

    const file = new PutObjectCommand(params);

    await s3.send(file);

    const getObject = new GetObjectCommand({
      Bucket: "fornecedores-cap",
      Key: fileName,
    });

    const url = await getSignedUrl(s3, getObject, { expiresIn: 3600 });

    return url;
  };
}
getData = async () => {
  const res = await SupplierModel.find();
  return res;
};

module.exports = SupplierService;
