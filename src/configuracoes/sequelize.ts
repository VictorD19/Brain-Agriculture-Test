import { Sequelize } from "sequelize";

const sequelize = new Sequelize("brain-agriculture", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
});
(async () => {
  await sequelize.sync();
  console.log("Banco inicializado com sucesso");
})();
export { sequelize };
