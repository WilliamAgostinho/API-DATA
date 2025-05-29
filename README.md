Este projeto consiste em uma API em Node.js (backend) e uma interface em React com Vite (frontend) para controle de produtos com autenticação JWT.

---

Usuário para inserir no banco via postman deve conter:
Nome, email e senha
OBS:Futuramente será implementado tela de cadastro de usuário.

## Para realizar o login somente email e senha é validado.

## 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 18 ou superior)
- [npm](https://www.npmjs.com/) (vem junto com o Node.js)
- [Banco de dados configurado] — MySql

---

## 🚀 Instalação e execução

### 🔙 Backend

1. Abra o terminal na pasta `API-DATA`:

   ```bash
   cd API-DATA
   ```

2. Instale as dependências:

   ```cmd
   npm install
   npm install express-rate-limit
   ```

3. Rode o backend:

   ```bash
   npm start
   ```

   > Isso irá iniciar o servidor usando `nodemon` (porta padrão: `http://localhost:3000`)

---

### 💻 Frontend

1. Abra outro terminal na pasta `API-DATA/frontend`:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode o projeto React:

   ```bash
   npm run dev
   ```

   > O projeto abrirá no navegador automaticamente (porta padrão: `http://localhost:5173`)

---

## 🔑 Login de Teste

- Você pode usar um usuário já cadastrado no banco ou cadastrar diretamente pela base para testar.
- Após o login, um token será salvo no `localStorage` e usado para acessar a tela de produtos.

---

## 🛠 Funcionalidades

- Login com autenticação JWT
- Cadastro de produto (nome, valor, quantidade)
- Edição e exclusão de produtos
- Listagem com atualização em tempo real
- Proteção de rotas no frontend
