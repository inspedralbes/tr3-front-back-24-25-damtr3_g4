import { DataTypes } from "sequelize";
// import defUsuaris from './Usuaris.js';
// import defGame from './Game.js';

const defTeams = (sequelize) => {
    return sequelize.define('teams', {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'teams',
        timestamps: false,
    });
};

export default defTeams;