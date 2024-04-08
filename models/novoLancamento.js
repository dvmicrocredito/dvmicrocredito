import { Schema, model, models } from "mongoose";

const NovoLancamentoSchema = new Schema(
  {
    nomeCompleto: { type: String, require: true },
    totalEmprestimo: { type: String, require: true },
    jurosEmprestimo: { type: String, require: true },
    totalParcelas: { type: String, require: true },
    multaDia: { type: String, require: true },
    userId: { type: String, require: true },
  },
  { timestamps: true }
);

const NovoLancamento =
  models.NovoLancamento || model("NovoLancamento", NovoLancamentoSchema);

export default NovoLancamento;
