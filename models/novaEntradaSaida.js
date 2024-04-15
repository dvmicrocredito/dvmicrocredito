import { Schema, model, models } from "mongoose";

const NovaEntradaSaidaSchema = new Schema(
  {
    nomeCompleto: { type: String, require: true },
    tipoLancamento: { type: String, require: true },
    tempoPagamento: { type: String, require: true },
    totalParcelas: { type: String, require: true },
    totalEmprestimo: { type: String, require: true },
    totalParcelasBaseDados: { type: String, require: true },
    userId: { type: String, require: true },
  },
  { timestamps: true }
);

const NovaEntradaSaida =
  models.NovaEntradaSaida || model("NovaEntradaSaida", NovaEntradaSaidaSchema);

export default NovaEntradaSaida;
