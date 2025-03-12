CREATE DATABASE IF NOT EXISTS fourbito;
USE fourbito;

-- Tabla de Usuarios
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_team VARCHAR(50),
    id_inventory INT,
    FOREIGN KEY (id_inventory) REFERENCES Inventory(id) ON DELETE SET NULL
    FOREIGN KEY (id_team) REFERENCES Teams(id) ON DELETE SET NULL
);

-- Tabla de Juegos
CREATE TABLE Player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR(255) NOT NULL
);

-- Tabla de Tienda (Botiga)
CREATE TABLE Shop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- Tabla de Inventario
CREATE TABLE Inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_item INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (id_user) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (id_item) REFERENCES Shop(id) ON DELETE CASCADE
);

-- Tabla de Partidas (Port)
CREATE TABLE Game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user1 INT,
    user2 INT,
    team1 INT,
    team2 INT,
    result VARCHAR(255),
    FOREIGN KEY (p1) REFERENCES User(id) ON DELETE SET NULL,
    FOREIGN KEY (p2) REFERENCES User(id) ON DELETE SET NULL
);

-- Tabla de Equipos (Teams)
CREATE TABLE Teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_game INT,
    FOREIGN KEY (id_user) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (id_game) REFERENCES Game(id) ON DELETE CASCADE
);
