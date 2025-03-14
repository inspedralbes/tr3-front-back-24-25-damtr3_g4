import { DataTypes } from "sequelize";

const defGame = (sequelize) => {
    return sequelize.define('games', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        id_user2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        id_team1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'teams',
                key: 'id'
            }
        },
        id_team2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'teams',
                key: 'id'
            }
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'games',
        timestamps: false,
    });
};

export default defGame;