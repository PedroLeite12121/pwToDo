use pedroleite12121_db;

CREATE TABLE tbUsuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

INSERT INTO tbUsuarios (nome, usuario, senha)
VALUES
('Carlos Silva','carlos.silva','pbkdf2_sha256$12345$c4rlo5'),
('Bruno Ferreira','bferreira_dev','bruno@access#99'),
('Ana Oliveira','ana_oliveira88','secure!Password2024'),
('Mariana Souza','mari.souza','M4riana_Security'),
('Ricardo Lima','r.lima_admin','Admin*Pass*77');

CREATE TABLE tbTarefas (
    idTarefa INT AUTO_INCREMENT PRIMARY KEY,
    nome_da_tarefa VARCHAR(100) NOT NULL,
    tempo VARCHAR(15),
    relevancia VARCHAR(20),
    status VARCHAR(20)
);

INSERT INTO tbTarefas (nome_da_tarefa, tempo, relevancia, status)
VALUES
('Organizar e-mails','30 min','importante','em progresso'),
('Lavar a louça','15 min','pouco importante','finalizada'),
('Estudar para a prova','120 min','muito importante','atrasada'),
('Ir à academia','60 min','importante','em progresso'),
('Pagar contas do mês','20 min','muito importante','finalizada'),
('Fazer compras no mercado','90 min','importante','atrasada'),
('Limpar o escritório','45 min','pouco importante','em progresso'),
('Reunião de equipe','60 min','muito importante','finalizada'),
('Preparar marmitas','120 min','importante','em progresso'),
('Levar o cachorro para passear','30 min','pouco importante','finalizada'),
('Ler 20 páginas de um livro','40 min','importante','atrasada'),
('Meditar','10 min','pouco importante','finalizada'),
('Atualizar currículo','60 min','muito importante','em progresso'),
('Cortar o cabelo','45 min','importante','atrasada'),
('Arrumar a cama','5 min','pouco importante','finalizada'),
('Responder mensagens no WhatsApp','20 min','importante','em progresso'),
('Backup de arquivos','30 min','muito importante','atrasada'),
('Trocar as lâmpadas queimadas','15 min','pouco importante','em progresso'),
('Planejar as férias','90 min','importante','atrasada'),
('Jantar com a família','120 min','muito importante','finalizada');

CREATE TABLE tbUsuario_Tarefa (
	idUsuarioTarefa INT AUTO_INCREMENT PRIMARY KEY,
	idTarefa INT NOT NULL,
    idUsuario INT NOT NULL,
	FOREIGN KEY (idTarefa) REFERENCES tbTarefas(idTarefa),
    FOREIGN KEY (idUsuario) REFERENCES tbUsuarios(idUsuario)
);

INSERT INTO tbUsuario_Tarefa (idTarefa, idUsuario)
VALUES
(1,1),
(2,1),
(3,2),
(4,2),
(5,3),
(6,3),
(7,4),
(8,4),
(9,5),
(10,5),
(11,1),
(12,2),
(13,3),
(14,4),
(15,5),
(16,1),
(17,2),
(18,3),
(19,4),
(20,5);

CREATE TABLE tbDevs (
    idDev INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    funcao VARCHAR(50) NOT NULL,
    frase VARCHAR(100) NOT NULL,
    link_url VARCHAR(255)
);

INSERT INTO tbDevs (nome, funcao, frase, link_url)
VALUES
('Thiago Mantovani','Desenvolvedor Backend (Node.js)','Café é o combustível, mas o código limpo é a alma do projeto.','https://i.pravatar.cc/150?u=thiago'),
('Beatriz Luz','Desenvolvedora Frontend (React)','Se o design não for responsivo, a experiência do usuário está quebrada.','https://i.pravatar.cc/150?u=beatriz'),
('Lucas Ferreira','Engenheiro de Dados','Dados são o novo petróleo, mas sem refinamento são apenas ruído.','https://i.pravatar.cc/150?u=lucas'),
('Sofia Alencar','Desenvolvedora Fullstack','A melhor parte do dia é quando o bug que levou 3 horas é resolvido com uma linha.','https://i.pravatar.cc/150?u=sofia'),
('André Souza','Especialista em DevOps','Automatizar não é luxo, é sobrevivência em escala.','https://i.pravatar.cc/150?u=andre');

SELECT tbTarefas.*
FROM tbUsuario_Tarefa
INNER JOIN tbTarefas
    ON tbUsuario_Tarefa.idTarefa = tbTarefas.idTarefa
WHERE tbUsuario_Tarefa.idUsuario = 1;

select * from tbUsuarios;
select * from tbTarefas;
select * from tbUsuario_Tarefa;
select * from tbDevs;