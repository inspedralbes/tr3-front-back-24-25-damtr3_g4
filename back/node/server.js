import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { Usuaris, Player, Teams, TeamPlayers, Game, Shop, syncDatabase, Settings, Inventory } from './models/index.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.NODE_PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

syncDatabase().then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Error starting server:', error);
});



app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("username", username, "email", email, "password", password);

        const existingUser = await Usuaris.findOne({
            where: {
                email
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const clientResponse = await fetch("http://host.docker.internal:4002/createClient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: username, email }),
        });

        const clientData = await clientResponse.json();

        if (!clientResponse.ok) throw new Error(clientData.error || "Error al crear el cliente en odoo");

        const odooClientId = clientData.id;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Usuaris.create({
            id: odooClientId,
            username,
            email,
            password: hashedPassword,
        });

        res.status(200).json({ message: "User registrado correctamente", user: newUser });

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Usuaris.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Inicio de sesión exitoso', user });
        console.log("inicio de sesión correcto");
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

app.post('/saveMatchConfig', async (req, res) => {
    try {
        const { matchDuration, goalsToWin, selectedPlayer } = req.body;
        console.log('Received config:', req.body);

        const [settings, created] = await Settings.upsert({
            id: 1,
            matchDuration,
            goalsToWin,
            selectedPlayer
        });

        res.status(200).json({ message: "Configuración guardada correctamente", settings });
    } catch (error) {
        console.error('Error al guardar la configuración:', error);
        res.status(500).json({ error: 'Error al guardar la configuración' });
    }
});

app.get('/getMatchConfig', async (req, res) => {
    try {
        const settings = await Settings.findByPk(1);

        if (!settings) {
            return res.status(404).json({ error: 'Configuración no encontrada' });
        }

        res.status(200).json(settings);
    } catch (error) {
        console.error('Error al obtener la configuración:', error);
        res.status(500).json({ error: 'Error al obtener la configuración' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await Usuaris.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await Usuaris.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await Usuaris.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

app.post('/player', async (req, res) => {
    try {

        //verificar si se envió la imagen
        if (!req.files || !req.files.img) {
            return res.status(400).json({ error: 'Imagen no encontrada' });
        }

        //Obtener de la request
        const { img } = req.files;
        const { name } = req.body;

        //Validar name
        if (!name) return res.status(400).json({ error: 'El Nombre del jugador es obligatorio' });

        //Crear directorio uploads/players
        const uploadDir = path.join('uploads', 'players');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        //Mover la imagen al directorio
        const imgName = `${Date.now()}_${img.name}`;
        const imgPath = path.join(uploadDir, imgName);

        await img.mv(imgPath);

        //Crear el jugador
        const newPlayer = await Player.create({
            name,
            img: imgName
        });

        res.status(200).json({ message: "Jugador creado correctamente", player: newPlayer });
    } catch (error) {
        console.error('Error al crear el jugador:', error);
        res.status(500).json({ error: 'Error al crear el jugador' });
    }

});

app.get('/players', async (req, res) => {
    try {
        const players = await Player.findAll();
        res.json(players);
    } catch (error) {
        console.error('Error al obtener los jugadores:', error);
        res.status(500).json({ error: 'Error al obtener los jugadores' });
    }
});

app.get('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);

        if (!player) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }

        res.json(player);
    } catch (error) {
        console.error('Error al obtener el jugador:', error);
        res.status(500).json({ error: 'Error al obtener el jugador' });
    }
});

app.delete('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);

        if (!player) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }

        await player.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el jugador:', error);
        res.status(500).json({ error: 'Error al eliminar el jugador' });
    }
});

app.post('/teams', async (req, res) => {

    try {
        const { id_user, name } = req.body;

        console.log("id_user", id_user, "name", name);
        //validar datos
        if (!id_user) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        //verificar si el usuario existe
        console.log("hola");
        const user = await Usuaris.findByPk(id_user);
        console.log("user", user);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        //crear el equipo
        const newTeam = await Teams.create({
            id_user,
            name
        });

        res.status(200).json({ message: "Equipo creado correctamente", team: newTeam });
    } catch (error) {
        console.error('Error al crear el equipo:', error);
        res.status(500).json({ error: 'Error al crear el equipo' });
    }
});

app.get('/teams', async (req, res) => {
    try {
        const teams = await Teams.findAll();
        res.json(teams);
    } catch (error) {
        console.error('Error al obtener los equipos:', error);
        res.status(500).json({ error: 'Error al obtener los equipos' });
    }
});

app.get('/teams/:id', async (req, res) => {
    try {
        const team = await Teams.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        res.json(team);
    } catch (error) {
        console.error('Error al obtener el equipo:', error);
        res.status(500).json({ error: 'Error al obtener el equipo' });
    }
});

app.post('/playersInTeam', async (req, res) => {
    try {
        const { id_team, players } = req.body;
        console.log("id_team", id_team, "players", players);
        if (!id_team || !Array.isArray(players) || players.length === 0) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        // Verificar si el equipo existe
        const team = await Teams.findByPk(id_team);
        console.log("team", team);
        if (!team) return res.status(404).json({ error: 'Equipo no encontrado' });

        // Verificar si los jugadores existen en la tabla de Players
        const validPlayers = await Player.findAll({ where: { id: players } });
        console.log("validPlayers", validPlayers);

        if (validPlayers.length !== players.length) {
            return res.status(400).json({ error: 'Uno o más jugadores no existen' });
        }

        // Crear registros en la tabla team_players
        const teamPlayers = players.map((id_player) => ({
            id_team,
            id_player,
        }));

        await TeamPlayers.bulkCreate(teamPlayers);

        res.status(201).json({ message: "Jugadores asignados correctamente", teamPlayers });

    } catch (error) {
        console.error('Error al añadir jugadores al equipo:', error);
        res.status(500).json({ error: 'Error al añadir jugador al equipo' });
    }
});

app.get('/playerInTeam/:id_team', async (req, res) => {
    try {
        const { id_team } = req.params;
        console.log("id_team", id_team);

        const players = await TeamPlayers.findAll({
            where: { id_team },
            include: [
                {
                    model: Player,
                    attributes: ['id', 'name', 'img'],
                }
            ]
        });

        res.json(players);
    } catch (error) {
        console.error('Error al cargar jugadores del equipo:', error);
        res.status(500).json({ error: 'Error al cargar jugadores del equipo' });
    }
});

app.get('/shopItems', async (req, res) => {
    try {
        const items = await Shop.findAll();
        res.json(items);
    } catch (error) {
        console.error('Error al obtener los objetos de la tienda:', error);
        res.status(500).json({ error: 'Error al obtener los objetos de la tienda' });
    }
});

app.post('/shop/buy', async (req, res) => {
    const { userId, itemId, quantity } = req.body;

    console.log('Tipo de dato de cantidad:', typeof quantity);
    if (quantity < 1 || quantity > 3) {
        return res.status(400).json({ error: 'Cantidad no permitida' });
    }


    try {
        const user = await Usuaris.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const item = await Shop.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Objeto no encontrado' });
        }

        const totalPrice = item.price * quantity;
        if (user.coins < totalPrice) {
            return res.status(400).json({ error: 'No tienes suficientes monedas' });
        }

        user.coins -= totalPrice;
        await user.save();

        const [inventoryItem, created] = await Inventory.findOrCreate({
            where: { id_user: userId, id_item: itemId },
            defaults: { quantity }
        });

        if (!created) {
            inventoryItem.quantity += quantity;
            await inventoryItem.save();
        }

        res.json({ message: 'Objeto comprado correctamente', user, inventoryItem });

    } catch (error) {
        console.error('Error al comprar un objeto de la tienda:', error);
        res.status(500).json({ error: 'Error al comprar un objeto de la tienda' });

    }
});

app.get('/inventory/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const inventory = await Inventory.findAll({
            where: { id_user: userId },
            include: [{ model: Shop, as: 'shop', attributes: ['name', 'price'] }]
        });
        res.json(inventory);

    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        res.status(500).json({ error: 'Error al obtener el inventario' });
    }
});

app.post('/users/add-coins', async (req, res) => {
    const { userId, coins } = req.body;

    if (!Number.isInteger(coins) || coins <= 0) {
        return res.status(400).json({ error: 'Cantidad de monedas no válida' });
    }

    try {
        const user = await Usuaris.findByPk(userId);

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        user.coins += coins;

        // Si el usuario tiene penalización, restar la deuda acumulada
        if (user.penalty_coins > 0) {
            const penaltyToDeduct = Math.min(user.penalty_coins, user.coins);
            user.coins -= penaltyToDeduct;
            user.penalty_coins -= penaltyToDeduct;
        }
        await user.save();
        res.json({ message: 'Monedas añadidas correctamente', user });

    } catch (error) {
        console.error('Error al añadir monedas:', error);
        res.status(500).json({ error: 'Error al añadir monedas' });

    }
});

app.post('/users/remove-coins', async (req, res) => {
    const { userId, coins } = req.body;

    if (!Number.isInteger(coins) || coins <= 0) {
        return res.status(400).json({ error: 'Cantidad de monedas no válida' });
    }

    try {
        const user = await Usuaris.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        if (user.coins >= coins) user.coins -= coins;

        await user.save();
        res.json({ message: 'Monedas restadas correctamente', user });

    } catch (error) {
        console.error('Error al restar monedas:', error);
        res.status(500).json({ error: 'Error al restar monedas' });
    }
});

app.post('/users/win-game', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await Usuaris.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        user.coins += 200;
        user.wins += 1;
        await user.save();
        res.json({ message: 'Juego ganado, monedas añadidas 200', user });

    } catch (error) {
        console.error('Error al añadir recompensa:', error);
        res.status(500).json({ error: 'Error al añadir recompensa' });
    }
});

app.post('/users/lose-game', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await Usuaris.findByPk(userId);

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        if (user.coins >= 50) {
            user.coins -= 50;
        }

        user.losses += 1;
        await user.save();
        res.json({ message: 'Juego perdido, monedas restadas 50', user });

    } catch (error) {
        console.error('Error al añadir penalización:', error);
        res.status(500).json({ error: 'Error al añadir penalización' });

    }
});

app.post('/save-result', async (req, res) => {
    const { id_user1, id_user2, id_team1, id_team2, result } = req.body;

    try {
        if (!id_user1 || !id_user2 || !id_team1 || !id_team2 || !result) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const newGame = await Game.create({
            id_user1,
            id_user2,
            id_team1,
            id_team2,
            result
        })

        return res.status(200).json({ message: 'Resultado guardado correctamente', game: newGame });

    } catch (error) {
        console.error('Error al guardar el resultado:', error);
        res.status(500).json({ error: 'Error al guardar el resultado' });

    }
})

app.get('/games', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(500).json({ error: 'Error al obtener los juegos' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});