import sequelize from '../config/database.js';
import defUsuaris from '../models/Usuaris.js';
import defGame from '../models/Game.js';
import defTeams from '../models/Teams.js';
import defInventory from '../models/Inventory.js';
import defShop from '../models/Shop.js';
import defPlayer from '../models/Player.js';
import defSettings from '../models/Settings.js';
import defTeamPlayers from '../models/TeamPlayers.js';
import loadInitialData from '../scripts/loadInitialData.js';

// Inicializar modelos
const Usuaris = defUsuaris(sequelize);
const Game = defGame(sequelize);
const Teams = defTeams(sequelize);
const Inventory = defInventory(sequelize);
const Shop = defShop(sequelize);
const Player = defPlayer(sequelize);
const Settings = defSettings(sequelize);
const TeamPlayers = defTeamPlayers(sequelize);

// Definir relaciones correctamente

// Un usuario pertenece a un equipo
Usuaris.belongsTo(Teams, { foreignKey: 'id_team', onDelete: 'SET NULL' });
Teams.hasMany(Usuaris, { foreignKey: 'id_team', onDelete: 'SET NULL' });

// Un usuario tiene un inventario
Usuaris.hasMany(Inventory, { foreignKey: 'id_user', onDelete: 'CASCADE' });
Inventory.belongsTo(Usuaris, { foreignKey: 'id_user', onDelete: 'CASCADE' });

// Un jugador pertenece a una partida
Player.belongsTo(Game, { foreignKey: 'id_game', onDelete: 'CASCADE' });
Game.hasMany(Player, { foreignKey: 'id_game', onDelete: 'CASCADE' });

// Un usuario puede tener varios jugadores
Usuaris.hasMany(Player, { foreignKey: 'id_user', onDelete: 'CASCADE' });
Player.belongsTo(Usuaris, { foreignKey: 'id_user', onDelete: 'CASCADE' });

// Un inventario pertenece a un ítem de la tienda
Inventory.belongsTo(Shop, { foreignKey: 'id_item', onDelete: 'CASCADE' });
Shop.hasMany(Inventory, { foreignKey: 'id_item', onDelete: 'CASCADE' });

// Relación de muchos a muchos entre equipos y jugadores
Teams.belongsToMany(Player, { through: TeamPlayers, foreignKey: 'id_team', onDelete: 'CASCADE' });
Player.belongsToMany(Teams, { through: TeamPlayers, foreignKey: 'id_player', onDelete: 'CASCADE' });

// Relación entre TeamPlayers y Player
TeamPlayers.belongsTo(Player, { foreignKey: 'id_player', onDelete: 'CASCADE' });
Player.hasMany(TeamPlayers, { foreignKey: 'id_player', onDelete: 'CASCADE' });

// Relación entre TeamPlayers y Teams
TeamPlayers.belongsTo(Teams, { foreignKey: 'id_team', onDelete: 'CASCADE' });
Teams.hasMany(TeamPlayers, { foreignKey: 'id_team', onDelete: 'CASCADE' });

// Sincronizar la base de datos
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
        await loadInitialData();
    } catch (error) {
        console.log('Error al sincronizar la base de datos', error);
    }
}

export {
    sequelize,
    Usuaris,
    Game,
    Teams,
    Inventory,
    Shop,
    Player,
    Settings,
    TeamPlayers,
    syncDatabase
};