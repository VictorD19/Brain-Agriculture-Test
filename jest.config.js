/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@utilidades/(.*)$": "<rootDir>/src/utilidades/$1",
    "^@servicos/(.*)$": "<rootDir>/src/servicos/$1",
    "^@repositorios/(.*)$": "<rootDir>/src/repositorios/$1",
    "^@modelos/(.*)$": "<rootDir>/src/modelos/$1",
    "^@configuracoes/(.*)$": "<rootDir>/src/configuracoes/$1",
  },
};
