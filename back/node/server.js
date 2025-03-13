import express from 'express';
// import path from 'path';
import cors from 'cors';
import bcrypt from 'bcryptjs';
// import { fileURLToPath } from 'url';
// import { Sequelize } from 'sequelize';
import { sequelize, Usuaris, syncDatabase } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

syncDatabase().then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Error starting server:', error);
});


app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await Usuaris.findOne({
            where: {
                username, email
            },
        });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Usuaris.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(200).json(newUser);

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar el usuario por nombre de usuario
        const user = await Usuaris.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Respuesta exitosa (puedes incluir un token JWT aquí si lo deseas)
        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
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
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// startServer();

