import { DataTypes } from 'sequelize';

const defPlayer = (sequelize) => {
    return sequelize.define('players', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: 'players',
        timestamps: false,
    });
};

export default defPlayer;
