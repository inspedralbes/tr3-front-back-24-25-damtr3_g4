import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
// import defShop from './Shop.js';

const defInventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'shop',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'inventory',
    timestamps: false,
});

export default defInventory;