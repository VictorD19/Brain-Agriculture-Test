/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@utilidades/(.*)$": "<rootDir>/utilidades/$1",
    "^@servicos/(.*)$": "<rootDir>/servicos/$1",
    "^@repositorios/(.*)$": "<rootDir>/repositorios/$1",
    "^@modelos/(.*)$": "<rootDir>/modelos/$1",
    "^@configuracoes/(.*)$": "<rootDir>/configuracoes/$1",
  },
  rootDir:"./src"
};
