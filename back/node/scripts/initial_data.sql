-- 1️⃣ Insertar usuarios primero
INSERT INTO users (id, username, email, password, id_team, coins, wins, losses) VALUES  
(1, 'admin', 'admin@gmail.com', 'admin1234', NULL, 200, 0, 0),  
(2, 'player1', 'player1@gmail.com', 'player1234', NULL, 200, 2, 1),  
(3, 'player2', 'player2@gmail.com', 'player2345', NULL, 200, 3, 2),  
(4, 'guest', 'guest@gmail.com', 'guest5678', NULL, 200, 0, 0);  

-- 2️⃣ Ahora insertar equipos (id_user ya existe en `users`)
INSERT INTO teams (id, id_user, name, badge) VALUES
(1, 1, 'Team A', 'img_a.png'),
(2, 2, 'Team B', 'img_b.png'),
(3, 3, 'Team C', 'img_c.png'),
(4, 4, 'Team D', 'img_d.png');

-- 3️⃣ Actualizar la columna `id_team` en `users` para reflejar la relación
UPDATE users SET id_team = 1 WHERE id = 2;
UPDATE users SET id_team = 2 WHERE id = 3;
UPDATE users SET id_team = 3 WHERE id = 4;

-- Insertar elementos en la tienda
INSERT INTO shop (id, name, description, img, price) VALUES
(1, 'sudadera', 'Sudadera roja', '1742989631609_sudadera_roja.jpg', 100);

-- 4️⃣ Insertar partidas después
INSERT INTO games (id, id_user1, id_user2, id_team1, id_team2, result) VALUES
(1, 1, 2, 1, 2, '1-0'),
(2, 2, 1, 2, 1, '0-1'),
(3, 3, 4, 3, 4, '2-2'),
(4, 4, 3, 4, 3, '3-3');

-- 5️⃣ Insertar inventario
INSERT INTO inventory (id, id_user, id_item, quantity) VALUES
(1, 1, 1, 2);

-- 6️⃣ Insertar jugadores
INSERT INTO players (id, img) VALUES
(1, 'player1.png'),
(2, 'player2.png'),
(3, 'player3.png'),
(4, 'player4.png');

-- 7️⃣ Configuración general
INSERT INTO settings (id, matchDuration, goalsToWin, selectedPlayer) VALUES
(1, 5, 5, 3);

-- 8️⃣ Relación entre equipos y jugadores
INSERT INTO team_players (id, id_team, id_player) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 3);
