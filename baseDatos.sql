
create DATABASE teamfight;
USE teamfight;

drop table usuarios;
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

CREATE TABLE tags (
    usuario varchar(20) primary key not null,
    tag varchar(10) not null,
    usuario_añadadido varchar(20) not null,
    juego int
    
);

SELECT Host, User, authentication_string FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

select * FROM usuarios;
delete from usuarios where league = 'milk n cookies';