// scripts/loadInitialData.js
import fs from 'fs';
import path from 'path';
import { sequelize } from '../models/index.js';

const loadInitialData = async () => {
    const filePath = path.join(process.cwd(), 'scripts', 'initial_data.sql'); // Ruta al archivo SQL
    const sql = fs.readFileSync(filePath, 'utf8'); // Leer el archivo SQL

    try {
        await sequelize.query(sql); // Ejecutar el archivo SQL
        console.log('Datos iniciales cargados correctamente.');
    } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
    }
};

export default loadInitialData;