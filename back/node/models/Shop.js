import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';

const Shop = sequelize.define('Shops', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'shops',
    timestamps: false
});

export default Shop;