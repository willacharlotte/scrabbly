"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSquares = void 0;
const models_1 = require("../models");
const getSquares = (req, res) => {
    res.end(JSON.stringify(models_1.SQUARES));
};
exports.getSquares = getSquares;
