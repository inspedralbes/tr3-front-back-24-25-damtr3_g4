import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
// import defUsuaris from './Usuaris.js';
// import defGame from './Game.js';

const defTeams = sequelize.define('Teams', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    id_game: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'games',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'teams',
    timestamps: false,
});

export default defTeams;