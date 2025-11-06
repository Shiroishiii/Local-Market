const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Altere para o nome do seu user no MySQL
    password: 'senai',    // Altere para a senha correta
    database: 'local_market',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.json());

app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuarios' });
    }
});

app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuario' });
    }
});

app.post('/usuario', async (req, res) => {
    const { nome, email, senha, rua, bairro, estado, cep, cnpj, telefone, tipo } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, senha, rua, bairro, estado, cep, cnpj, telefone, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, email, senha, rua, bairro, estado, cep, cnpj, telefone, tipo]
        );
        const [novoCliente] = await pool.query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
        res.status(201).json(novoCliente[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar usuario' });
    }
});

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, email, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET nome = ?, endereco = ?, email = ?, telefone = ? WHERE id = ?',
            [nome, endereco, email, telefone, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        const [clienteAtualizado] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        res.json(clienteAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        res.json({ message: 'Usuario deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


//ITEM

app.get('/item', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM item');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar itens' });
    }
});

app.get('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM item WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar item' });
    }
});


app.post('/item', async (req, res) => {
    const {titulo, descricao, categoria, preco_diaria, status, rua, bairro, estado, cep, telefone, } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO item (titulo, descricao, categoria, preco_diaria, status, rua, bairro, estado, cep, telefone, ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, descricao, categoria, preco_diaria, status, rua, bairro, estado, cep, telefone ]
        );
        const [novoItem] = await pool.query('SELECT * FROM item WHERE id = ?', [result.insertId]);
        res.status(201).json(novoItem[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar item' });
    }
});

// TERMINAR PUT

app.put('/item/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, email, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET nome = ?, endereco = ?, email = ?, telefone = ? WHERE id = ?',
            [nome, endereco, email, telefone, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        const [clienteAtualizado] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        res.json(clienteAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
});


app.delete('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM item WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.json({ message: 'Item deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar item' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});