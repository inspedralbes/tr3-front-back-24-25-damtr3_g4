import sequelize from '../config/database.js';
import Usuaris from '../models/Usuaris.js';
import defGame from '../models/Game.js';
import defTeams from '../models/Teams.js';
import defInventory from '../models/Inventory.js';
import defShop from '../models/Shop.js';
import defPlayer from '../models/Player.js';
import loadInitialData from '../scripts/loadInitialData.js';

Usuaris(sequelize);
defGame(sequelize);
defTeams(sequelize);
defInventory(sequelize);
defShop(sequelize);
defPlayer(sequelize);


// Usuaris.belongsTo(Teams, { foreignKey: 'id_team' });
// Teams.hasOne(Usuaris, { foreignKey: 'id_team' });

// Usuaris.belongsTo(Inventory, { foreignKey: 'id_inventory' });
// Inventory.hasOne(Usuaris, { foreignKey: 'id_inventory' });

// Player.belongsTo(Game, { foreignKey: 'id_game' });
// Usuaris.hasMany(Player, { foreignKey: 'id_user' });

// Inventory.belongsTo(Shop, { foreignKey: 'id_item' }); //relacionar inventario con tienda
// Shop.hasMany(Inventory, { foreignKey: 'id_item' });

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Sincroniza los modelos (force: true para recrear tablas)
        console.log('Database synchronized');
        await loadInitialData(); // Cargar datos iniciales
    } catch (error) {
        console.log('Error al sincronizar la base de datos', error);
    }
}

export {
    sequelize,
    Usuaris,
    defGame,
    defTeams,
    defInventory,
    defShop,
    defPlayer,
    syncDatabase
}