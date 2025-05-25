const db = require('../database/db');
const bcrypt = require('bcryptjs');
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
            if (err) {
                console.error('Erro na comparação de senha:', err);
                return res.status(500).send('Erro interno');
            }

            if (!isMatch) return res.status(401).send('Senha inválida');

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