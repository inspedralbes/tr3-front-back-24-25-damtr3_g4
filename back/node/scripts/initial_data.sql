-- Insert data into the 'users' table
INSERT INTO users (id, username, email, password, id_team, id_inventory) VALUES
(1, 'user1', 'user1@example.com', 'password1', 1, 1),
(2, 'user2', 'user2@example.com', 'password2', 2, 2),
(3, 'user3', 'user3@example.com', 'password3', 1, 3),
(4, 'user4', 'user4@example.com', 'password4', 2, 4);

-- Insert data into the 'teams' table
INSERT INTO teams (id, id_user, id_game, name) VALUES
(1, 1, 1, 'Team A'),
(2, 2, 2, 'Team B'),
(3, 3, 1, 'Team C'),
(4, 4, 2, 'Team D');

-- Insert data into the 'inventory' table
INSERT INTO inventory (id, id_user, id_item, quantity) VALUES
(1, 1, 1, 10),
(2, 2, 2, 5),
(3, 3, 3, 15),
(4, 4, 4, 20);

-- Insert data into the 'shop' table
INSERT INTO shop (id, name, description, img, price) VALUES
(1, 'Item A', 'Description for Item A', 'img_a.png', 100),
(2, 'Item B', 'Description for Item B', 'img_b.png', 200),
(3, 'Item C', 'Description for Item C', 'img_c.png', 300),
(4, 'Item D', 'Description for Item D', 'img_d.png', 400);

-- Insert data into the 'players' table
INSERT INTO players (id, img) VALUES
(1, 'player1.png'),
(2, 'player2.png'),
(3, 'player3.png'),
(4, 'player4.png');

-- Insert data into the 'games' table
INSERT INTO games (id, user1, user2, team1, team2, result) VALUES
(1, 1, 2, 1, 2, '1-0'),
(2, 2, 1, 2, 1, '0-1'),
(3, 3, 4, 3, 4, '2-2'),
(4, 4, 3, 4, 3, '3-3');