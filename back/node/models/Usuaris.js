import { DataTypes } from "sequelize";

const defUsuaris = (sequelize) => {
    return sequelize.define('users', {
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
                model: 'teams',
                key: 'id'
            }
        },
        id_inventory: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'inventory',
                key: 'id'
            }
        },
    }, {
        tableName: 'users',
        timestamps: false
    });
};

export default defUsuaris;
