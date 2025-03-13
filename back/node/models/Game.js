import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
// import defUsuaris from '../models/Usuaris.js';

const defGame = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    user2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    team1: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    team2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'games',
    timestamps: false,
});

export default defGame;