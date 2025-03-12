import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'players',
    timestamps: false,
}
);

export default Player;
