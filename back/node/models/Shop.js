import { DataTypes } from "sequelize";

const defShop = (sequelize) => {
    return sequelize.define('shop', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'shop',
        timestamps: false,
    });
};

export default defShop;