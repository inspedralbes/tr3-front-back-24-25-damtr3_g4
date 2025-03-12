import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nombre_de_tu_base_de_datos', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;