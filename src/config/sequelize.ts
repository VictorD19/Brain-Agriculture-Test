import { Sequelize } from "sequelize";

const sequelize = new Sequelize("brain-agriculture", "usuario", "senha", {
  host: "localhost",
  dialect: "postgres",
});

export { sequelize };
