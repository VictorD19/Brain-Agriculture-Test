import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME || "brain-agriculture", process.env.DB_USER || "postgres",process.env.DB_PASSWORD || "postgres", {
  host: process.env.DB_HOST  || "localhost",
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
});
const iniciarConexao = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida.");
    await sequelize.sync({ alter: true });
    console.log("Banco sincronizado com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};

export { sequelize, iniciarConexao };