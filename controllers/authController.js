const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

exports.login = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send('Nome, email e senha são obrigatórios');
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao gerar hash:', err);
            return res.status(500).send('Erro ao processar senha');
        }

        db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hash],
            (err, result) => {
                if (err) {
                    console.error('Erro no INSERT:', err);
                    return res.status(500).send('Erro ao criar usuário');
                }

                res.status(201).json({
                    id: result.insertId,
                    nome,
                    email
                });
            }
        );
    });
};
