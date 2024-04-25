import { Schema, model, models } from "mongoose";

const EmprestimosSolicitadosSchema = new Schema(
  {
    nomeCompleto: { type: String, require: true },
    nomeCompletoAvalista: { type: String, require: true },
    bI: { type: String, require: true },
    bIAvalista: { type: String, require: true },
    contacto: { type: String, require: true },
    contactoAvalista: { type: String, require: true },
    saldo: { type: String, require: true },
    endereco: { type: String, require: true },
    enderecoAvalista: { type: String, require: true },
    numeroQuarteirao: { type: String, require: true },
    numeroQuarteiraoAvalista: { type: String, require: true },
    numeroCasa: { type: String, require: true },
    numeroCasaAvalista: { type: String, require: true },
    bairro: { type: String, require: true },
    bairroAvalista: { type: String, require: true },
    distrito: { type: String, require: true },
    distritoAvalista: { type: String, require: true },
    provincia: { type: String, require: true },
    fonteRendimento: { type: String, require: true },
    garantias: { type: String, require: true },
    genero2: { type: String, require: true },
    genero2Avalista: { type: String, require: true },
    nUIT: { type: String, require: true },
    nUITAvalista: { type: String, require: true },
    dataNascimento: { type: String, require: true },
    dataNascimentoAvalista: { type: String, require: true },
    nacionalidade: { type: String, require: true },
    nacionalidadeAvalista: { type: String, require: true },
    estadoCivil: { type: String, require: true },
    estadoCivilAvalista: { type: String, require: true },
    status: { type: Boolean, require: true },
    anexos: [
      {
        link: { type: String },
      },
    ],
    userId: { type: String, require: true },
  },
  { timestamps: true }
);

const EmprestimosSolicitados =
  models.EmprestimosSolicitados ||
  model("EmprestimosSolicitados", EmprestimosSolicitadosSchema);

export default EmprestimosSolicitados;
