const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRACAO = '2m';

exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Erro no servidor');
        if (results.length === 0) return res.status(401).send('Usuário não encontrado');

        const usuario = results[0];

        bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).send('Senha inválida');

            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                JWT_SECRET,
                { expiresIn: EXPIRACAO }
            );

            res.status(200).json({
                mensagem: 'Login bem sucedido',
                token: token
            });
        });
    });
};

exports.register = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send('Nome, email e senha são obrigatórios');
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) return res.status(500).send('Erro ao processar senha');

        db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hash],
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).send('Email já está em uso, tente outro!');
                    }
                    console.error('Erro ao criar usuário:', err);
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
