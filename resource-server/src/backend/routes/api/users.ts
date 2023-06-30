import express from "express";

import {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser,
  } from "../../controllers";

export const usersRoute = express.Router();

usersRoute.route('/users')
    .get(getUsers)
    .post(postUser);

usersRoute.route('/users/:username')
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);



