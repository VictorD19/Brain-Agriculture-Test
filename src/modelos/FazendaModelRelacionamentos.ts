import { ProdutorModel } from "@modelos/ProdutorModel";
import { FazendaModel } from "@modelos/FazendaModel";

FazendaModel.belongsTo(ProdutorModel, {
  foreignKey: "ProdutorId",
  as: "Produtor",
});

ProdutorModel.hasMany(FazendaModel, {
  foreignKey: "ProdutorId",
  as: "Fazenda",
});
