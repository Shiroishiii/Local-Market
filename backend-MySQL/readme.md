Base do nosso banco de dados local:

CREATE DATABASE local_market;

USE local_market;

CREATE TABLE usuario(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
email VARCHAR(100) UNIQUE ,
senha VARCHAR(20),
cidade VARCHAR(100),
rua VARCHAR(100),
bairro VARCHAR(100),
estado VARCHAR(100),
cep BIGINT(8),
cpf BIGINT(11) UNIQUE,
cnpj BIGINT (14) UNIQUE,
telefone BIGINT(20),
tipo ENUM ('Locatario', 'Locador')
);

INSERT INTO usuario (nome, email, senha, cidade, rua, bairro, estado, cep, cpf, telefone, tipo)
VALUES 
('Maria Silva', 'maria.silva@email.com', 'senha123', 'Campinas', 'Rua das Flores, 45', 'Centro', 'SP', 12345678, 12345678901, 11987654321, 'Locatario'),
('João Pereira', 'joao.pereira@email.com', 'joao123', 'Forquilinhas', 'Av. Paulista, 1000', 'Bela Vista', 'SP', 98765432, 98765432100, 11999998888, 'Locador'),
('Carla Souza', 'carla.souza@email.com', 'carla456', 'Itapema', 'Rua do Sol, 10', 'Boa Vista', 'PE', 54321000, 32165498700, 81988887777, 'Locatario'),
('Mercado Bom Preço', 'contato@bompreco.com', 'bompreco01', 'Maceió', 'Av. Brasil, 200', 'Centro', 'RJ', 22290000, 1234500012345, 21999990000, 'Locador'),
('Lucas Andrade', 'lucas.andrade@email.com', 'lucas999', 'Guarulhos', 'Rua A, 15', 'Jardim América', 'MG', 30140000, 78945612300, 31977776666, 'Locatario');


SELECT * FROM usuario;

CREATE TABLE item(
id_item INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100),
descricao VARCHAR(300),
categoria ENUM('Veículos', 'Ferramentas', 'Vestimentas', 'Espaço kids', 'Máquinas', 'Salão de festa'),
preco_diaria DECIMAL(8,2),
status ENUM( 'Novo','Seminovo','Em bom estado','Danificado','Em manutenção','Em avaliação','Obsoleto'),
cidade VARCHAR(100),
rua VARCHAR(100),
bairro VARCHAR(100),
estado VARCHAR(100),
cep BIGINT(8),
telefone BIGINT(20),
usuario_id INT,
FOREIGN KEY (usuario_id) REFERENCES usuario (id_usuario)
);

SELECT * FROM item;

INSERT INTO item
(titulo, descricao, categoria, preco_diaria, status, cidade, rua, bairro, estado, cep, telefone, usuario_id)
VALUES
('Gol 1.6 Completo','Carro popular, econômico e confortável, ideal para viagens curtas e longas.' ,'Veículos','150.00 ', 'Em bom estado' ,'Campinas','Rua das Acácias, 120','Jardim das Flores' ,'SP','04567210' ,'11998764532', 1),
('Furadeira Bosch 600W', 'Furadeira potente para uso doméstico e profissional, com ajuste de velocidade.', 'Ferramentas', 35.00, 'Novo','São José', 'Rua Pedro Álvares, 45', 'Centro', 'RJ', '22045380', '21987652345', 2),
('Fantasia de Super-Herói Infantil', 'Fantasia completa com capa e máscara, tamanhos de 4 a 8 anos.', 'Vestimentas', 20.00, 'Em avaliação','Belo Horizonte', 'Rua São Bento, 300', 'Vila Nova', 'MG', '30190120', '31996547723', 3),
('Brinquedoteca Móvel', 'Espaço kids inflável com escorregador e piscina de bolinhas, ideal para festas.', 'Espaço kids', 180.00, 'Danificado', 'Palhoça', 'Rua dos Ipês, 77', 'Parque das Árvores', 'PR', '81540200', '41999018899', 4),
('Salão Golden Fest', 'Salão de festa climatizado com capacidade para 200 pessoas, inclui mesas e cadeiras.', 'Salão de festa', 850.00, 'Em manutenção','Angelina', 'Avenida Central, 999', 'Jardim América', 'RS', '90120000', '51998001122', 5);

CREATE TABLE aluguel(
id_aluguel INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
data_inicio DATETIME,
data_fim DATETIME,
valor_total DECIMAL(8,2),
usuario_id INT,
FOREIGN KEY (usuario_id) REFERENCES usuario (id_usuario),
item_id INT,
FOREIGN KEY (item_id) REFERENCES item (id_item)
);


INSERT INTO aluguel
(data_inicio, data_fim, valor_total,usuario_id, item_id)
VALUES
('2025-11-05 09:00:00', '2025-11-07 18:00:00', 300.00,1, 1),
('2025-11-10 08:00:00', '2025-11-10 18:00:00', 35.00, 2, 2),
('2025-11-12 14:00:00', '2025-11-14 20:00:00', 40.00, 3, 3),
('2025-11-18 09:00:00', '2025-11-18 17:00:00', 180.00, 4, 4),
('2025-11-22 19:00:00', '2025-11-23 03:00:00', 850.00,5, 5);


CREATE TABLE pagamento(
id_pagamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
data_pagamento DATETIME,
valor DECIMAL(8,2),
forma_pagamento ENUM ('Débito','Crédito', 'Pix'),
status_pagamento ENUM('Aguardando pagamento','Pagamento realizado'),
aluguel_id INT,
FOREIGN KEY (aluguel_id) REFERENCES aluguel (id_aluguel)
);

INSERT INTO pagamento 
(data_pagamento, valor, forma_pagamento, status_pagamento, aluguel_id)
VALUES
('2025-11-07 19:00:00', 300.00, 'Crédito', 'Pagamento realizado', 1), -- Gol 1.6 Completo
('2025-11-10 18:30:00', 35.00, 'Pix', 'Pagamento realizado', 2),       -- Furadeira Bosch
('2025-11-15 10:00:00', 40.00, 'Débito', 'Aguardando pagamento', 3),   -- Fantasia Infantil
('2025-11-18 18:00:00', 180.00, 'Pix', 'Pagamento realizado', 4),      -- Brinquedoteca
('2025-11-23 04:00:00', 850.00, 'Crédito', 'Aguardando pagamento', 5); -- Salão Golden Fest




CREATE TABLE avaliacao(
id_avaliacao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nota TINYINT(5),
comentario TEXT,
data DATE,
aluguel_id INT,
FOREIGN KEY (alUguel_id) REFERENCES aluguel (id_aluguel)
);

INSERT INTO avaliacao 
(nota, comentario, data, aluguel_id)
VALUES
(5, 'Carro em ótimo estado, muito limpo e econômico. Recomendo!', '2025-11-08', 1), -- Gol 1.6 Completo
(4, 'Furadeira funcionou bem, apenas um pouco pesada.', '2025-11-11', 2),          -- Furadeira Bosch
(3, 'Fantasia bonita, mas o tamanho veio um pouco diferente.', '2025-11-15', 3),   -- Fantasia Infantil
(5, 'As crianças adoraram! Equipamento seguro e bem conservado.', '2025-11-19', 4),-- Brinquedoteca Móvel
(4, 'Salão espaçoso e organizado, mas o ar-condicionado falhou no final.', '2025-11-24', 5); -- Salão Golden Fest
