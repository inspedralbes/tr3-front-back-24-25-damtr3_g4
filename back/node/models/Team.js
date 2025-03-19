import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';

const Team = sequelize.define('Teams', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'teams',
    timestamps: false
});

export default Team;
