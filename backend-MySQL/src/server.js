const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const db = require("./database");


const app = express();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Altere para o nome do seu user no MySQL
    password: '1234',    // Altere para a senha correta
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
    const { nome, email, senha, imagem, cidade, rua, bairro, estado, cep, cpf, cnpj, telefone, tipo } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, senha, imagem, cidade, rua, bairro, estado, cep, cpf, cnpj, telefone, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
            [nome, email, senha, imagem, cidade, rua, bairro, estado, cep, cpf, cnpj, telefone, tipo]
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
    const { nome,  senha, imagem, cidade, rua, bairro, estado, cep, telefone } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET nome = ?, senha = ?,imagem = ?, cidade = ?, rua = ?, bairro = ?, estado = ?, cep = ?, telefone = ? WHERE id_usuario = ?',
            [nome,  senha, imagem, cidade, rua, bairro, estado, cep, telefone, id]
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





//Foto DE PERFIL

// Função para garantir que a coluna imagem existe
async function garantirColunaImagem() {
    try {
        // Verificar se a coluna existe
        const [columns] = await pool.query(
            "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'local_market' AND TABLE_NAME = 'usuario' AND COLUMN_NAME = 'imagem'"
        );
        
        if (columns.length === 0) {
            // Coluna não existe, vamos criar
            console.log("Coluna 'imagem' não encontrada. Criando...");
            await pool.query("ALTER TABLE usuario ADD COLUMN imagem VARCHAR(256) NULL");
            console.log("Coluna 'imagem' criada com sucesso!");
        }
    } catch (err) {
        console.error("Erro ao verificar/criar coluna imagem:", err);
    }
}

// Garantir que a coluna existe ao iniciar o servidor
garantirColunaImagem();

app.post('/usuario/salvar-imagem', async (req, res) => {
    console.log("BODY RECEBIDO:", req.body);
    console.log("Tipo de id_usuario:", typeof req.body.id_usuario);

    const { id_usuario, imagem } = req.body;

    if (!id_usuario || !imagem) {
        console.log("ERRO → id_usuario ou imagem vazio!");
        return res.status(400).json({ error: "Dados incompletos" });
    }

    // Converter id_usuario para número se necessário
    const idUsuarioNum = parseInt(id_usuario);
    
    if (isNaN(idUsuarioNum)) {
        console.log("ERRO → id_usuario não é um número válido:", id_usuario);
        return res.status(400).json({ error: "ID de usuário inválido" });
    }

    try {
        console.log("Tentando atualizar imagem para usuário ID:", idUsuarioNum);
        console.log("Nome da imagem:", imagem);

        const [result] = await pool.query(
            'UPDATE usuario SET imagem = ? WHERE id_usuario = ?',
            [imagem, idUsuarioNum]
        );

        console.log("Resultado do UPDATE:", result);
        console.log("Linhas afetadas:", result.affectedRows);

        if (result.affectedRows === 0) {
            console.log("Nenhuma linha afetada - usuário não encontrado");
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Buscar usuário atualizado para retornar
        const [usuarioAtualizado] = await pool.query(
            'SELECT * FROM usuario WHERE id_usuario = ?',
            [idUsuarioNum]
        );

        if (!usuarioAtualizado || usuarioAtualizado.length === 0) {
            console.log("Usuário não encontrado após UPDATE");
            return res.status(404).json({ error: "Usuário não encontrado após atualização" });
        }

        console.log("Usuário atualizado encontrado:", usuarioAtualizado[0]);

        return res.status(200).json({ 
            message: "Imagem salva com sucesso!",
            usuario: usuarioAtualizado[0]
        });
    } catch (err) {
        console.error("Erro ao salvar imagem:", err);
        console.error("Mensagem de erro:", err.message);
        console.error("Stack trace:", err.stack);
        return res.status(500).json({ 
            error: "Erro no servidor",
            details: err.message 
        });
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
        const [rows] = await pool.query('SELECT * FROM item WHERE id_item = ?', [id]);
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
    
    const {titulo, descricao, categoria, preco,  cidade, rua, bairro, estado, cep, telefone, imagem, usuario_id } = req.body;
    
    // Validação básica
    if (!titulo || !descricao || !categoria || !preco || !usuario_id) {
        return res.status(400).json({ 
            error: 'Campos obrigatórios faltando',
            details: 'Título, descrição, categoria, preço e usuário são obrigatórios'
        });
    }
    
    // Converter usuario_id para número inteiro
    const usuarioIdInt = parseInt(usuario_id);
    if (isNaN(usuarioIdInt) || usuarioIdInt <= 0) {
        return res.status(400).json({ 
            error: 'ID de usuário inválido',
            details: 'O ID do usuário deve ser um número válido'
        });
    }
    
    try {
        // Verificar se o usuário existe antes de inserir
        const [usuarioExiste] = await pool.query('SELECT id_usuario FROM usuario WHERE id_usuario = ?', [usuarioIdInt]);
        
        if (usuarioExiste.length === 0) {
            return res.status(404).json({ 
                error: 'Usuário não encontrado',
                details: `O usuário com ID ${usuarioIdInt} não existe no banco de dados`
            });
        }
        
        const [result] = await pool.query(
            'INSERT INTO item (titulo, descricao, categoria, preco_diaria, cidade, rua, bairro, estado, cep, telefone, imagem, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                titulo || null,
                descricao || null,
                categoria || null,
                preco || null,
                cidade || null,
                rua || null,
                bairro || null,
                estado || null,
                cep || null,
                telefone || null,
                imagem || null,
                usuarioIdInt
            ]
        );
        const [novoItem] = await pool.query('SELECT * FROM item WHERE id_item = ?', [result.insertId]);
        res.status(201).json(novoItem[0]);
    } catch (err) {
        console.error('Erro completo ao adicionar item:', err);
        console.error('Mensagem de erro:', err.message);
        console.error('Stack trace:', err.stack);
        res.status(500).json({ 
            error: 'Erro ao adicionar item',
            details: err.message 
        });
    }
});


app.put('/item/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, preco,  cidade, rua, bairro, estado, cep, telefone, imagem } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE item SET descricao = ?, preco_diaria = ?, cidade = ?, rua = ?, bairro = ?, estado = ?, cep = ?, telefone = ?,  imagem = ? WHERE id_item = ?',
            [descricao, preco,  cidade, rua, bairro, estado, cep, telefone, imagem, id]
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
        // Retorna array vazio se não encontrar, em vez de 404
        res.json(rows || []);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar aluguel' });
    }
});

app.post('/aluguel', async (req, res) => {
    const { data_inicio, data_fim, valor_total, usuario_id, item_id} = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO aluguel (data_inicio, data_fim, valor_total, usuario_id, item_id) VALUES (?, ?, ?, ?, ?)',
            [data_inicio, data_fim, valor_total, usuario_id, item_id]
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
    const {data_inicio, data_fim, valor_total, } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET data_inicio = ?, data_fim = ?, valor_total = ?,  WHERE id_aluguel = ?',
            [data_inicio, data_fim, valor_total, ]
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
            'INSERT INTO pagamento (data_pagamento, valor, forma_pagamento , status_pagamento, aluguel_id) VALUES (?, ?, ?, ?, ?)',
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







app.delete('/avaliacao/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM avaliacao WHERE id_avaliacao = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'avaliacao não encontrado' });
        }
        res.json({ message: 'avaliacao deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar avaliacao' });
    }
});


app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});







// LOCATARIO
  