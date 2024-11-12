import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Brain Agriculture API",
      version: "1.0.0",
      description: "API para gerenciamento de produtores rurais e fazendas.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/controladores/*.ts", "./src/rotas/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
