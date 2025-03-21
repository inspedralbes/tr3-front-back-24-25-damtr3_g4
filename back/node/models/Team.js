import { DataTypes } from "sequelize";

const defTeam = (sequelize) => {
    return sequelize.define('teams', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'teams',
        timestamps: false
    });
};

export default defTeam;
