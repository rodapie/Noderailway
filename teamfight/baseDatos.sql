
create DATABASE teamfight;



USE teamfight;
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(14) NOT NULL UNIQUE,   
    league VARCHAR(14) NULL,
    servidor varchar(3) NULL,
    siege VARCHAR(16)  NULL,
    plataforma VARCHAR(4) NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    passw VARCHAR(75) NOT NULL,
    favoritos VARCHAR(200) NULL
    
);


CREATE TABLE tags ( id INT PRIMARY KEY AUTO_INCREMENT, usuario VARCHAR(14) 	NOT NULL, tag varchar(20), amigo varchar(14), juego int, region varchar(5));


SELECT Host, User, authentication_string FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';


select * FROM usuarios;
select * from tags;


drop table usuarios;
drop table tags;

insert into usuarios (id, usuario, league, servidor, siege, plataforma, email, passw, favoritos) values(1, "camilo", "milk n cookies", "euw", "HaunterLv.100", "pc", "g@g.com", "1234", "");