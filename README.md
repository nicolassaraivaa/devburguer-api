# DevBurguer API 🍔

API para gerenciamento de pedidos, produtos e categorias de um sistema de delivery de hambúrgueres. Este projeto foi desenvolvido utilizando **Node.js**, **Express**, **Sequelize** e **MongoDB**.

---

## 🚀 Funcionalidades

- **Autenticação:**
  - Cadastro de usuários com senha criptografada.
  - Login com geração de token JWT.

- **Gerenciamento de Produtos:**
  - Cadastro, listagem e atualização de produtos.
  - Upload de imagens para produtos.

- **Gerenciamento de Categorias:**
  - Cadastro, listagem e atualização de categorias.
  - Upload de imagens para categorias.

- **Pedidos:**
  - Criação de pedidos com produtos e quantidades.
  - Atualização do status do pedido.
  - Listagem de pedidos.

- **Pagamentos:**
  - Integração com Stripe para criação de intents de pagamento.

---

## 🛠️ Tecnologias Utilizadas

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) com PostgreSQL
- [Mongoose](https://mongoosejs.com/) com MongoDB
- [JWT](https://jwt.io/) para autenticação
- [Multer](https://github.com/expressjs/multer) para upload de arquivos
- [Stripe](https://stripe.com/) para pagamentos

### Ferramentas de Desenvolvimento

- [Nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) para padronização de código

---

## ⚙️ Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/devburguer-api.git
   cd devburguer-api

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente no arquivo `.env` (exemplo de variáveis: `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, etc).

4. Execute o servidor em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

## 🌐 Rotas da API:

### 🔐 Autenticação:

- `POST /users`: Cadastro de usuários.
- `POST /session`: Login e geração de token.

### 🍔 Produtos:

- `POST /products`: Cadastro de produtos (requer autenticação e upload de imagem).
- `GET /products`: Listagem de produtos.
- `PUT /products/:id`: Atualização de produtos (requer autenticação).

### 🗂️ Categorias:

- `POST /categories`: Cadastro de categorias (requer autenticação e upload de imagem).
- `GET /categories`: Listagem de categorias.
- `PUT /categories/:id`: Atualização de categorias (requer autenticação).

### 📦 Pedidos:

- `POST /orders`: Criação de pedidos.
- `GET /orders`: Listagem de pedidos.
- `PUT /orders/:id`: Atualização do status do pedido (requer autenticação de admin).

### 💳 Pagamentos:

- `POST /create-payment-intent`: Criação de intent de pagamento com Stripe.

