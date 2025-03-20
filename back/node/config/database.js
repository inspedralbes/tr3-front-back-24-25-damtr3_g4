// filepath: /home/a21fabrolfer/Desktop/TE-ERRE-TRES/tr3-front-back-24-25-damtr3_g4/back/node/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.NODE_DB_NAME, process.env.NODE_DB_USER, process.env.NODE_DB_PASSWORD, {
    host: process.env.NODE_DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true,
    },
    // logging: false,
});

export default sequelize;