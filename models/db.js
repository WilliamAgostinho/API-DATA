const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
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
