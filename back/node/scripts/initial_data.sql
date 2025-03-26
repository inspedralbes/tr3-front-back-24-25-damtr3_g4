-- 1️⃣ Insert data into the 'shop' table (Independent)

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