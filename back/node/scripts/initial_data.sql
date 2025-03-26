-- 1️⃣ Insert data into the 'shop' table (Independent)
INSERT INTO shop (id, name, description, img, price) VALUES
(1, 'Camiseta', 'Camiseta legendaria', '1742892211575_camiseta_legendaria.jpg', 100),
(2, 'Sudadera', 'Sudadera legendaria', '1742892743958_sudadera_legendaria.jpg', 200),
(3, 'Item C', 'Description for Item C', 'img_c.png', 300),
(4, 'Item D', 'Description for Item D', 'img_d.png', 400);

--  Insert data into the 'users' table (Independent)
INSERT INTO users (id, username, email, password, coins) VALUES
(1, 'user1', 'user1@example.com', 'password1', 0),
(2, 'user2', 'user2@example.com', 'password2', 0),
(3, 'user3', 'user3@example.com', 'password3', 0),
(4, 'user4', 'user4@example.com', 'password4', 0);


-- 4️⃣ Insert data into the 'teams' table (Depends on users and games)
INSERT INTO teams (id, id_user, name, badge) VALUES
(1, 1, 'Team A', 'img_a.png'),
(2, 2, 'Team B', 'img_b.png'),
(3, 3, 'Team C', 'img_c.png'),
(4, 4, 'Team D', 'img_d.png');

INSERT INTO games (id, id_user1, id_user2, id_team1, id_team2, result) VALUES
(1, 1, 2, 1, 2, '1-0'),
(2, 2, 1, 2, 1, '0-1'),
(3, 3, 4, 3, 4, '2-2'),
(4, 4, 3, 4, 3, '3-3');

-- 5️⃣ Insert data into the 'inventory' table (Depends on users and shop)
INSERT INTO inventory (id, id_user, id_item, quantity) VALUES
(1, 1, 1, 10),
(2, 2, 2, 5),
(3, 3, 3, 15),
(4, 4, 4, 20);

-- 6️⃣ Insert data into the 'players' table (Last, as it may reference users/teams)
INSERT INTO players (id, img) VALUES
(1, 'player1.png'),
(2, 'player2.png'),
(3, 'player3.png'),
(4, 'player4.png');

INSERT INTO settings (id, matchDuration, goalsToWin, selectedPlayer) VALUES
(1, 5, 5, 3);

INSERT INTO team_players (id, id_team, id_player) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 3);