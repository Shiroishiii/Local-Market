const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Altere para o nome do seu user no MySQL
    password: 'senai',    // Altere para a senha correta
    // password: '2008isac',    // Altere para a senha correta
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
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
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
    console.log('Corpo recebido: ', req.body);
    const { nome, email, senha, cidade, rua, bairro, estado, cep, cpf, cnpj, telefone, tipo } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, senha, cidade, rua, bairro, estado, cep, cpf, cnpj, telefone, tipo) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
            [nome, email, senha, cidade, rua, bairro, estado, cep, cpf, cnpj, telefone, tipo]
        );
        const [novoCliente] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [result.insertId]);
        res.status(201).json(novoCliente[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar usuario' });
    }
});

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome,  senha, cidade, rua, bairro, estado, cep, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET nome = ?, senha = ?, cidade = ?, rua = ?, bairro = ?, estado = ?, cep = ?, telefone = ? WHERE id_usuario = ?',
            [nome,  senha, cidade, rua, bairro, estado, cep, telefone, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        const [clienteAtualizado] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
        res.json(clienteAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        res.json({ message: 'Usuario deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
});



//LOGIN

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Busca usuário pelo email e senha
        const [rows] = await pool.query(
            'SELECT * FROM usuario WHERE email = ? AND senha = ?',
            [email, senha]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        // Usuário encontrado
        res.json(rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
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
        const [rows] = await pool.query('SELECT * FROM item WHERE id_usuario = ?', [id]);
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
    console.log("cheguei aqui, as informações são: ", req.body);
    
    const {titulo, descricao, categoria, preco, status, cidade, rua, bairro, estado, cep, telefone, usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO item (titulo, descricao, categoria, preco_diaria, status, cidade, rua, bairro, estado, cep, telefone, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, descricao, categoria, preco, status, cidade, rua, bairro, estado, cep, telefone, usuario_id ]
        );
        const [novoItem] = await pool.query('SELECT * FROM item WHERE id_item = ?', [result.insertId]);
        res.status(201).json(novoItem[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar item' });
    }
});


app.put('/item/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, preco, status, cidade, rua, bairro, estado, cep, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE item SET descricao = ?, preco_diaria = ?, status = ?, cidade = ?, rua = ?, bairro = ?, estado = ?, cep = ?, telefone = ? WHERE id_item = ?',
            [descricao, preco, status, cidade, rua, bairro, estado, cep, telefone]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        const [itemAtualizado] = await pool.query('SELECT * FROM item WHERE id_item = ?', [id]);
        res.json(itemAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar item' });
    }
});


app.delete('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM item WHERE id_item = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.json({ message: 'Item deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar item' });
    }
});


//ALUGUEL

app.get('/aluguel', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM aluguel');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar aluguel' });
    }
});

app.get('/aluguel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM aluguel WHERE id_aluguel = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Aluguel não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar aluguel' });
    }
});

// essa é a parte do julio
app.get('/aluguelporusuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT aluguel.id_aluguel,usuario.nome AS nome_usuario,item.titulo AS nome_item,item.rua AS rua_item,aluguel.data_inicio,aluguel.data_fim,aluguel.valor_total FROM aluguel JOIN usuario ON aluguel.usuario_id = usuario.id_usuario JOIN item ON aluguel.item_id = item.id_item WHERE usuario.id_usuario = ?;', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Aluguel não encontrado' });
        }
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar aluguel' });
    }
});

app.post('/aluguel', async (req, res) => {
    const { data_inicio, data_fim, valor_total, status, usuario_id, item_id} = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO aluguel (data_inicio, data_fim, valor_total, status, usuario_id, item_id) VALUES (?, ?, ?, ?,?,?)',
            [data_inicio, data_fim, valor_total, status, usuario_id, item_id]
        );
        const [novoAlguel] = await pool.query('SELECT * FROM aluguel WHERE id_aluguel = ?', [result.insertId]);
        res.status(201).json(novoAlguel[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar aluguel' });
    }
});

app.put('/aluguel/:id', async (req, res) => {
    const { id } = req.params;
    const {data_inicio, data_fim, valor_total, status} = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET data_inicio = ?, data_fim = ?, valor_total = ?, status = ? WHERE id_aluguel = ?',
            [data_inicio, data_fim, valor_total, status]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aluguel não encontrado' });
        }
        const [aluguelAtualizado] = await pool.query('SELECT * FROM aluguel WHERE id_aluguel = ?', [id]);
        res.json(aluguelAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar aluguel' });
    }
});

app.delete('/aluguel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM aluguel WHERE id_aluguel = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aluguel não encontrado' });
        }
        res.json({ message: 'Aluguel deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar aluguel' });
    }
});



//PAGAMENTO

app.get('/pagamento', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pagamento');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
});

app.get('/pagamento/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM pagamento WHERE id_pagamento = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'pagamento não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar pagamento' });
    }
});

app.post('/pagamento', async (req, res) => {
    const { data_pagamento, valor, forma_pagamento , status_pagamento, aluguel_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO aluguel (data_pagamento, valor, forma_pagamento , status_pagamento, aluguel_id) VALUES (?, ?, ?, ?, ?)',
            [data_pagamento, valor, forma_pagamento , status_pagamento, aluguel_id ]
        );
        const [novoPagamento] = await pool.query('SELECT * FROM pagamento WHERE id_pagamento = ?', [result.insertId]);
        res.status(201).json(novoPagamento[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar pagamento' });
    }
});

app.put('/pagamento/:id', async (req, res) => {
    const { id } = req.params;
    const {data_pagamento, valor, forma_pagamento, status_pagamento} = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE pagamento SET data_pagamento = ?, valor = ?, forma_pagamento = ?, status_pagamento = ? WHERE id_pagamento = ?',
            [data_pagamento, valor, forma_pagamento, status_pagamento]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pagamento não encontrado' });
        }
        const [pagamentoAtualizado] = await pool.query('SELECT * FROM pagamento WHERE id_pagamento = ?', [id]);
        res.json(pagamentoAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar pagamento' });
    }
});

app.delete('/pagamento/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM pagamento WHERE id_pagamento = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pagamento não encontrado' });
        }
        res.json({ message: 'Pagamento deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
});








// AVALIAÇÃO


app.get('/avaliacao', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM avaliacao');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar avaliacao' });
    }
});

app.get('/avaliacao/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM avaliacao WHERE id_avaliacao = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Avaliação não encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar avaliacao' });
    }
});

app.post('/avaliacao', async (req, res) => {
    const {nota, comentario, data } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO avaliacao (nota, comentario, data) VALUES (?, ?, ?, ?)',
            [nota, comentario, data ]
        );
        const [novaAvaliacao] = await pool.query('SELECT * FROM avaliacao WHERE id_avaliacao = ?', [result.insertId]);
        res.status(201).json(novaAvaliacao[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar avaliação' });
    }
});

app.put('/pagamento/:id', async (req, res) => {
    const { id } = req.params;
    const {data_pagamento, valor, forma_pagamento, status_pagamento} = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET data_inicio = ?, data_fim = ?, valor_total = ?, status = ? WHERE id_avaliacao = ?',
            [data_pagamento, valor, forma_pagamento, status_pagamento, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pagamento não encontrado' });
        }
        const [pagamentoAtualizado] = await pool.query('SELECT * FROM pagamento WHERE id_avaliacao = ?', [id]);
        res.json(pagamentoAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar pagamento' });
    }
});

app.delete('/pagamento/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM pagamento WHERE id_avaliacao = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pagamento não encontrado' });
        }
        res.json({ message: 'Pagamento deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});







// LOCATARIO
  