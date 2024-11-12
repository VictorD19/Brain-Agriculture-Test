# API Brain Agriculture

API desenvolvida para o sistema de gerenciamento de produtores rurais e suas fazendas, fornecendo endpoints para cadastro, consulta, edição, remoção e análise de dados agrícolas.

## 🚀 Tecnologias

- Node.js
- TypeScript
- PostgreSQL
- Sequelize (ORM)
- Express
- Jest (Testes)

## 📁 Estrutura do Projeto

```
src/
├── modelos/          # Definição dos modelos do Sequelize
├── repositorios/     # Camada de acesso a dados
├── interfaces/       # Definição interfaces
├── controladores/    # Definição dos controladores
├── rotas/            # Definição das rotas da API
├── servicos/         # Lógica de negócios
├── utilidades/       # Funções auxiliares e validações
└── app.ts            # Ponto de entrada da aplicação
```

## 🔧 Configuração do Ambiente

### Pré-requisitos

- Node.js (Versão utlizada: v21.7.3)
- PostgreSQL (v12+)
- NPM (Gerenciador de Pacotes)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DB_NAME=brain-agriculture
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_DIALECT=postgres
DB_DATABASE=5433
```

### Instalação Desenvolvimento

```bash
# Instalar dependências
npm install

# Criar banco de dados caso ele não exista
npm run db:criar

# Iniciar em desenvolvimento
npm run dev

# Executar testes
npm test
```

### Instalação Produção

```bash
# Instalar dependências
npm install

# Criar banco de dados caso ele não exista
npm run db:criar

# Iniciar build da aplicação
npm run build

# Iniciar em produção
npm run start
```

## 📚 Endpoints da API

### Produtores Rurais

#### GET /produtores

Retorna lista de todos os produtores rurais cadastrados.

#### GET /produtor/:id

Retorna dados de um produtor específico.

#### POST /produtor/inserir

Cadastra um novo produtor rural.

Exemplo de payload:

```json
{
  "cpf_cnpj": "123.456.789-00",
  "nome": "João Silva",
  "fazendas": [
    {
      "nomeFazenda": "Fazenda São João",
      "cidade": "Ribeirão Preto",
      "estado": "SP",
      "areaTotal": 100,
      "areaAgricultavel": 80,
      "areaVegetacao": 20,
      "culturas": [1, 2]
    }
  ]
}
```

Requisitos Precisa ter culturas cadastradas caso deseje vincular;

#### PATCH /produtor/

Atualiza dados de um produtor existente, seja para inserir novas fazenda,atualizar ou remover fazendas e culturas.

#### DELETE /produtor/:id

Remove um produtor do sistema.

### Dashboard

#### GET /dashboard/resumo

Retorna os dados segmentados para o dashboard:

- Total de fazendas
- Área total
- Distribuição por estado
- Distribuição por cultura
- Uso do solo

```json
//Retorno
{
  "Sucesso": true,
  "Mensagem": "",
  "Data": {
    "totalFazendas": 10,
    "totalArea": 1500.5,
    "fazendasPorEstado": [
      {
        "estado": "SP",
        "quantidade": 5
      }
    ],
    "fazendasPorCultura": [
      {
        "cultura": "Soja",
        "quantidade": 700.5
      }
    ],
    "usoSolo": {
      "totalAreaAgricultavel": 1000,
      "totalAreaVegetacao": 500
    }
  }
}
```

### Cultura

#### GET /cultura/:id

Retorna dados de uma cultura específica.

#### POST /cultura/inserir

Cadastra uma nova cultura.

```json
{
  "nome": "Soja"
}
```

#### PATCH /cultura/atualizar

Atualiza dados de uma cultura existente.
```json
{
  "id": 1,
  "nome": "Soja"
}
```
#### PATCH /cultura/remover/:id

Remove uma cultura do sistema.


## ✅ Validações Implementadas

- CPF/CNPJ válidos
- Soma das áreas (agricultável + vegetação) não pode exceder área total
- Dados obrigatórios e tipos corretos

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

1. **Rotas**: Recebem as requisições e direcionam para os serviços apropriados
2. **Serviços**: Implementam a lógica de negócio e validações
3. **Repositórios**: Abstraem o acesso ao banco de dados
4. **Modelos**: Definem a estrutura dos dados

Princípios SOLID e Clean Code foram aplicados para garantir código mantível e testável.

## 🧪 Testes

O projeto inclui testes unitários para:

- Validações de CPF/CNPJ
- Regras de negócio dos serviços
- Operações do repositório

Execute os testes com:

```bash
npm test
```

## 📦 Deploy

O projeto está configurado para deploy em containers Docker:

```bash
# Executar container
docker-compose up --build
```

## No ar 🚀

Acesse a API em: http://localhost:3000/api-docs para testar os endpoints.

