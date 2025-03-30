import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { Usuaris, Player, Teams, TeamPlayers, Game, Shop, syncDatabase, Settings, Inventory } from './models/index.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
// import multer from 'multer';

const app = express();
const PORT = process.env.NODE_PORT || 4000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use('/uploads/items', express.static(path.join(__dirname, 'uploads', 'items')));
app.use('/uploads/players', express.static(path.join(__dirname, 'uploads', 'players')));
app.use('/uploads/teams', express.static(path.join(__dirname, 'uploads', 'teams')));


syncDatabase().then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Error starting server:', error);
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/items');
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
//         cb(null, uniqueName);
//     }
// });

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

        res.status(200).json({ message: "User registrado correctamente", user: newUser, odoo: clientData });

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

app.post('/players', async (req, res) => {
    try {
        console.log('📥 Nueva solicitud recibida en /players');
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);
        console.log('Files:', req.files);

        // Verificar si el campo players existe
        if (!req.body.players) {
            console.error('❌ Error: Se requiere un array de jugadores en la solicitud');
            return res.status(400).json({ error: 'Se requiere un array de jugadores en la solicitud' });
        }

        let players;
        try {
            const parsedBody = JSON.parse(req.body.players);
            players = Array.isArray(parsedBody.players) ? parsedBody.players : []; // Parsear el campo players
        } catch (error) {
            console.error('❌ Error al parsear el campo players:', error);
            return res.status(400).json({ error: 'El campo players no tiene un formato válido' });
        }

        console.log('✅ Lista de jugadores recibida:', players);

        const files = req.files; // Archivos enviados

        const uploadDir = path.join(__dirname, 'uploads', 'players');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const insertedPlayers = [];

        for (const player of players) {
            const { name, img } = player; // `img` es la clave del archivo en `req.files`

            if (!name || !files[img]) {
                console.log(`❌ Datos incompletos para el jugador: ${name}`);
                continue;
            }

            const imgFile = files[img];
            const imgName = `${Date.now()}_${imgFile.name}`;
            const imgPath = path.join(uploadDir, imgName);

            // Mover la imagen al directorio
            await imgFile.mv(imgPath);

            console.log(`✅ Imagen del jugador ${name} movida correctamente`);

            // Insertar el jugador en la base de datos
            const newPlayer = await Player.create({
                name,
                img: imgName,
            });

            insertedPlayers.push(newPlayer);
        }

        console.log('✅ Todos los jugadores procesados correctamente');
        res.status(200).json({ message: 'Jugadores creados correctamente', players: insertedPlayers });
    } catch (error) {
        console.error('❌ Error al procesar los jugadores:', error);
        res.status(500).json({ error: 'Error al procesar los jugadores' });
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
        if (!req.files || !req.files.badge) {
            return res.status(400).json({ error: 'Imagen no encontrada' });
        }
        const { badge } = req.files;
        const { id_user, name } = req.body;

        console.log("id_user", id_user, "name", name);
        //validar datos
        if (!id_user) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        if (!name) return res.status(400).json({ error: 'El Nombre del equipo es obligatorio' });

        const user = await Usuaris.findByPk(id_user);
        console.log("user", user);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const uploadDir = path.join('uploads', 'teams');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir,
                { recursive: true });
        }

        const badgeName = `${Date.now()}_${badge.name}`;
        const badgePath = path.join(uploadDir, badgeName);

        await badge.mv(badgePath);

        //crear el equipo
        const newTeam = await Teams.create({
            id_user,
            name,
            badge: badgeName
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

app.post('/shop', async (req, res) => {
    try {
        if (!req.files || !req.files.img) {
            return res.status(400).json({ error: 'Imagen no encontrada' });
        }

        const { img } = req.files;
        const { name, description, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const uploadDir = path.join('uploads', 'items');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const imgName = `${Date.now()}_${img.name}`;
        const imgPath = path.join(uploadDir, imgName);

        await img.mv(imgPath);

        // Obtener la imagen en formato base64 para enviarla a Odoo
        const imgBuffer = fs.readFileSync(imgPath);
        const imgBase64 = imgBuffer.toString('base64');

        // Crear el producto en Odoo
        const odooResponse = await fetch("http://host.docker.internal:4002/createProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                img: imgBase64,
                price
            })
        });

        const odooData = await odooResponse.json();

        if (!odooResponse.ok) throw new Error(odooData.error || "Error al crear el producto en Odoo");

        const odooProductId = odooData.id; // Asumiendo que el ID del producto creado en Odoo está en `odooData.id`

        // Crear el producto en MySQL usando el ID de Odoo
        const newItem = await Shop.create({
            id: odooProductId, // Usamos el ID de Odoo directamente como el ID del producto
            name,
            description,
            img: imgName,
            price
        });

        res.status(200).json({ message: "Objeto añadido correctamente", item: newItem, odoo: odooData });

    } catch (error) {
        console.error('Error al añadir objeto a la tienda:', error);
        res.status(500).json({ error: 'Error al añadir objeto a la tienda' });
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

    console.log("Datos recibidos: " + userId, itemId, quantity);
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

        const saleOrderResponse = await fetch("http://host.docker.internal:4002/createSaleOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                partner_id: user.id,
                product_id: item.id,
                quantity,
                price: item.price
            })
        });

        const saleOrderData = await saleOrderResponse.json();

        if (!saleOrderResponse.ok) throw new Error(saleOrderData.error || "Error al crear la orden de venta en Odoo");

        res.json({
            message: 'Objeto comprado correctamente y orden de venta creada en Odoo',
            user,
            inventoryItem,
            saleOrder: saleOrderData
        });

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