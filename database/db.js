const mysql = require('mysql2');
require('dotenv').config();

const DB_USER     = process.env.DB_USER;
const DB_HOST     = process.env.DB_HOST;
const DB_NAME     = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

//USAR BANCO DE DADOS mysql
const conexao = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

conexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err.message);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

module.exports = conexao;
