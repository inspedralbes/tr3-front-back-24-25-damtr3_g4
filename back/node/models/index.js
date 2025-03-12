import { Sequelize } from 'sequelize';
import Usuaris from './Usuaris.js';
import Player from './Player.js';
import Inventory from './Inventory.js';
// import Game from './Game.js';
// import Teams from './Teams.js';
// import Shop from './Shop.js';

Usuaris.hasOne(Teams, { foreignKey: 'id_team' });
Teams.belongsTo(Usuaris, { foreignKey: 'id_team' });

Usuaris.hasOne(Inventory, { foreignKey: 'id_inventory' });
Inventory.belongsTo(Usuaris, { foreignKey: 'id_inventory' });

Inventory.belongsTo(Shop, { foreignKey: 'id_item' });
Shop.hasMany(Inventory, { foreignKey: 'id_item' });

// Game.belongsTo(Usuaris, { as: 'player1', foreignKey: 'user1' });

export {
    Usuaris,
    Player,
    Inventory,
    // Game,
    // Teams,
    // Shop
}