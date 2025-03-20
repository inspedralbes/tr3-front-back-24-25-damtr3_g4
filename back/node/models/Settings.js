import { DataTypes } from 'sequelize';

const defSettings = (sequelize) => {
    return sequelize.define('settings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        matchDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        goalsToWin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        selectedPlayer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'settings',
        timestamps: false,
    });
}

export default defSettings;