Base do nosso banco de dados local:

CREATE DATABASE local_market;

USE local_market;

CREATE TABLE usuario(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(20) UNIQUE NOT NULL,
rua VARCHAR(100),
bairro VARCHAR(100),
estado VARCHAR(100),
cep BIGINT(8),
cpf BIGINT(11) UNIQUE,
cnpj BIGINT (14) UNIQUE,
telefone BIGINT(20),
tipo ENUM ('Locatario', 'Locador')
);

INSERT INTO usuario (nome, email, senha, rua, bairro, estado, cep, cpf, telefone, tipo)
VALUES 
('Maria Silva', 'maria.silva@email.com', 'senha123', 'Rua das Flores, 45', 'Centro', 'SP', 12345678, 12345678901, 11987654321, 'Locatario'),
('João Pereira', 'joao.pereira@email.com', 'joao123', 'Av. Paulista, 1000', 'Bela Vista', 'SP', 98765432, 98765432100, 11999998888, 'Locador'),
('Carla Souza', 'carla.souza@email.com', 'carla456', 'Rua do Sol, 10', 'Boa Vista', 'PE', 54321000, 32165498700, 81988887777, 'Locatario'),
('Mercado Bom Preço', 'contato@bompreco.com', 'bompreco01', 'Av. Brasil, 200', 'Centro', 'RJ', 22290000, 1234500012345, 21999990000, 'Locador'),
('Lucas Andrade', 'lucas.andrade@email.com', 'lucas999', 'Rua A, 15', 'Jardim América', 'MG', 30140000, 78945612300, 31977776666, 'Locatario');


CREATE TABLE item(
id_item INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100),
descricao VARCHAR(300),
categoria ENUM('Veículos', 'Ferramentas', 'Vestimentas', 'Espaço kids', 'Máquinas', 'Salão de festa'),
preco_diaria DECIMAL(8,2),
status ENUM( 'Novo','Seminovo','Em bom estado','Danificado','Em manutenção','Em avaliação','Obsoleto'),
rua VARCHAR(100),
bairro VARCHAR(100),
estado VARCHAR(100),
cep BIGINT(8),
telefone BIGINT(20),
usuario_id INT,
FOREIGN KEY (usuario_id) REFERENCES usuario (id_usuario)
);

INSERT INTO item
(titulo,descricao,categoria,preco_diaria,status,rua,bairro,estado,cep,telefone)
VALUES
('Gol 1.6 Completo','Carro popular, econômico e confortável, ideal para viagens curtas e longas.' ,'Veículos','150.00 ', 'Em bom estado' ,'Rua das Acácias, 120','Jardim das Flores' ,'SP','04567210' ,'11998764532' ),
('Furadeira Bosch 600W', 'Furadeira potente para uso doméstico e profissional, com ajuste de velocidade.', 'Ferramentas', 35.00, 'Novo', 'Rua Pedro Álvares, 45', 'Centro', 'RJ', '22045380', '21987652345'),
('Fantasia de Super-Herói Infantil', 'Fantasia completa com capa e máscara, tamanhos de 4 a 8 anos.', 'Vestimentas', 20.00, 'Em avaliação', 'Rua São Bento, 300', 'Vila Nova', 'MG', '30190120', '31996547723'),
('Brinquedoteca Móvel', 'Espaço kids inflável com escorregador e piscina de bolinhas, ideal para festas.', 'Espaço kids', 180.00, 'Danificado', 'Rua dos Ipês, 77', 'Parque das Árvores', 'PR', '81540200', '41999018899'),
('Salão Golden Fest', 'Salão de festa climatizado com capacidade para 200 pessoas, inclui mesas e cadeiras.', 'Salão de festa', 850.00, 'Em manutenção', 'Avenida Central, 999', 'Jardim América', 'RS', '90120000', '51998001122');
