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
            allowNull: false,
            unique: true
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
        coins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 200,
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: 'users',
        timestamps: false
    });
};

export default defUsuaris;
