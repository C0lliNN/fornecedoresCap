const { Schema, model } = require("mongoose");

const SupplierSchema = new Schema({
  ["Registro Fiscal"]: { type: Number, default: null },
  ["Razão Social"]: { type: String, default: null },
  ["Nome Formulário"]: { type: String, default: null },
  Status: { type: String, default: "Pendente" },
  ["Nome Fantasia"]: { type: String, default: null },
  ["País"]: { type: String, default: "Brasil" },
  Estado: { type: String, default: null },
  Cidade: { type: String, default: null },
  Contato: { type: String, default: null },
  ["Conta de Pagamento"]: { type: String, default: null },
  Categoria: { type: String, default: null },
  ["Tipo de Serviço"]: { type: String, default: null },
  ["Tipo de Produto"]: { type: String, default: null },
  ["Contato Imediato"]: { type: String, default: null },
  Email: { type: String, default: null },
  Telefone: { type: String, default: null },
  ["Nível de Atendimento"]: { type: String, default: null },
});

const SupplierModel = model("supplier", SupplierSchema);

module.exports = SupplierModel;
