"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewGame = void 0;
const fill_rack_1 = require("./fill-rack");
const create_new_tile_bag_1 = require("./create-new-tile-bag");
const newPlayerFromUser = (user, tileBag) => {
    return {
        user: user,
        rack: (0, fill_rack_1.fillRack)({
            tiles: [],
        }, tileBag),
    };
};
const createNewGame = (users, gameId) => {
    const tileBag = (0, create_new_tile_bag_1.createNewTileBag)();
    const players = users.map((user) => newPlayerFromUser(user, tileBag));
    users.forEach((user) => user.games.push(gameId));
    return {
        id: gameId,
        players: players,
        moves: [],
        placedTiles: [],
        tiles: tileBag,
    };
};
exports.createNewGame = createNewGame;
