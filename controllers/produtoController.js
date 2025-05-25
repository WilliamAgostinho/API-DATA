const db = require('../database/db');

exports.getTodos = (req, res) => {
    db.query('SELECT * FROM produto', (err, results) => {
        if (err) return res.status(500).send('Erro ao buscar produtos');
        res.json(results);
    });
};

exports.getPorId = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM produto WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send('Erro ao buscar produto');
        if (result.length === 0) return res.status(404).send('Produto não encontrado');
        res.json(result[0]);
    });
};

exports.criar = (req, res) => {
    const { nome, valor, quantidade } = req.body;

    db.query(
        'INSERT INTO produto (nome, valor, quantidade) VALUES (?, ?, ?)',
        [nome, valor, quantidade],
        (err, result) => {
            if (err) return res.status(500).send('Erro ao criar produto');
            res.status(201).json({ id: result.insertId, nome, valor, quantidade });
        }
    );
};

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { nome, valor, quantidade } = req.body;

    db.query(
        'UPDATE produto SET nome = ?, valor = ?, quantidade = ? WHERE id = ?',
        [nome, valor, quantidade, id],
        (err, result) => {
            if (err) return res.status(500).send('Erro ao atualizar produto');
            if (result.affectedRows === 0) return res.status(404).send('Produto não encontrado');
            res.json({ id, nome, valor, quantidade });
        }
    );
};

exports.deletar = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM produto WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send('Erro ao deletar produto');
        if (result.affectedRows === 0) return res.status(404).send('Produto não encontrado');
        res.status(204).send('Produto deletado com sucesso');
    });
};
