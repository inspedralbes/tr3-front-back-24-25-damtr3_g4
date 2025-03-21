import { DataTypes } from 'sequelize';

const defTeamPlayers = (sequelize) => {
    return sequelize.define('teamPlayers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_team: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'teams',
                key: 'id'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        id_player: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'players',
                key: 'id'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
    }, {
        tableName: 'team_players',
        timestamps: false,
    });
};

export default defTeamPlayers;