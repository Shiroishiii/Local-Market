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
