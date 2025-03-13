import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
import Team from './Team.js';
import Inventory from '../models/Inventory.js';
// const bcrypt = require('bcryptjs');

const Usuaris = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_team: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Team,
            key: 'id'
        }
    },
    id_inventory: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Inventory,
            key: 'id'
        }
    },
}, {
    tableName: 'users',
    timestamps: false,
    // hooks: {
    //     beforeCreate: async (user) => {
    //         const salt = await bcrypt.genSalt(10);
    //         user.password = await bcrypt.hash(user.password, salt);
    //     }
    // }

});

export default Usuaris;