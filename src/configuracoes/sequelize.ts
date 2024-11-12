import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "brain-agriculture",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.HOST || "localhost",
    dialect: "postgres",
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);
(async () => {
  await sequelize.sync({ alter: true });
  console.log("Banco inicializado com sucesso");
})();
export { sequelize };
