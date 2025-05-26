const mysql = require('mysql2');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

//USAR BANCO DE DADOS mysql
const conexao = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'banco'
});

conexao.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err.message);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

module.exports = conexao;
