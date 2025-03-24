import { DataTypes } from "sequelize";

const defInventory = (sequelize) => {
    return sequelize.define('inventory', {
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
            defaultValue: 1,
        },
    }, {
        tableName: 'inventory',
        timestamps: false,
    });
};

export default defInventory;