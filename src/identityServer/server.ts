// import ttl from "level-ttl";
import express from "express";
import { Level } from "level";
import cookieParser from 'cookie-parser';

import { registerRoute } from "../routes/api/register";
import { exchangeCredentialsRoute } from "../routes/api/credentials";
import { authenticationRoute } from "../routes/api/authentication";
import { usersRoute } from "../routes/api/users";

import verifyToken from "./middleware/verify-token";
import { boardRoute } from "../routes/api/board";
import { gamesRoute } from "../routes/api/games";
// import { credentials } from "../backend/service/middleware/credentials";
import { DbConnection } from "../backend/dal/db-connection";

const app = express();
const port = 8080;

DbConnection.connectDB();

// handle credentials before cors
// app.use(credentials);

// middleware for cookies
app.use(cookieParser());

// serve static files

// register
app.use('/', registerRoute)
// login
app.use('/', exchangeCredentialsRoute)
// auth
app.use('/', authenticationRoute)

// app.use(express.json());
app.locals.store = new Level('./store', { valueEncoding: 'json' })
// app.locals.ttl = ttl(app.locals.store);

// backend routes
app.use(verifyToken); //all routes after this are secured by middleware
app.use('/', usersRoute);
app.use('/', gamesRoute);
app.use('/', boardRoute);

app.get("/test", async (_, res) => {
  res.end(
    JSON.stringify(await DbConnection.runQuery(`SELECT * FROM dbo.Player`))
  );
});


// need to check if db connection is open before checking for requests
app.listen(port, () => {
    console.log(`app listening on ${port}`);
  });