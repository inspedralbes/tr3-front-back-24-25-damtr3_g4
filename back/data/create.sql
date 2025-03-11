CREATE DATABASE IF NOT EXISTS fourbito;
USE fourbito;

-- 1️⃣ Primero, creamos las tablas independientes
CREATE TABLE Shop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR(255) NOT NULL
);

-- 2️⃣ Luego, creamos la tabla de Usuarios (User)
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    team VARCHAR(50)
);

-- 3️⃣ Ahora sí creamos Inventory, que referencia tanto a Shop como a User
CREATE TABLE Inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_item INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (id_user) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (id_item) REFERENCES Shop(id) ON DELETE CASCADE
);

-- 4️⃣ La tabla de Partidas (Game) que depende de User
CREATE TABLE Game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    p1 INT,
    p2 INT,
    t1 INT,
    t2 INT,
    result VARCHAR(255),
    FOREIGN KEY (p1) REFERENCES User(id) ON DELETE SET NULL,
    FOREIGN KEY (p2) REFERENCES User(id) ON DELETE SET NULL
);

-- 5️⃣ Finalmente, creamos Teams, que depende de User y Game
CREATE TABLE Teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_game INT,
    FOREIGN KEY (id_user) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (id_game) REFERENCES Game(id) ON DELETE CASCADE
);
