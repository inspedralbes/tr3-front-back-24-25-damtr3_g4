// config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('fourbito', 'root', 'root', {
    host: 'fourbito-mysql',
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true,
    },
    // logging: false,
});

export default sequelize;