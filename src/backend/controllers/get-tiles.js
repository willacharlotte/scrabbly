"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTiles = void 0;
const models_1 = require("../models");
const getTiles = (req, res) => {
    res.end(JSON.stringify(models_1.TILES));
};
exports.getTiles = getTiles;
