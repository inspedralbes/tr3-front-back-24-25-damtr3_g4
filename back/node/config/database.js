// config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('fourbitoo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true,
    },
    // logging: false,
});

export default sequelize;