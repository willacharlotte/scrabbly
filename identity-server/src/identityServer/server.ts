// import ttl from "level-ttl";
import express from "express";
import { Level } from "level";
// import cookieParser from "cookie-parser";

import { registerRoute } from "../routes/api/register";
import { exchangeCredentialsRoute } from "../routes/api/credentials";
import { authenticationRoute } from "../routes/api/authentication";

import verifyToken from "./middleware/verify-token";
import { corsOptions } from "../config/corsOptions";
import cors from 'cors';
import { userExists } from "./handlers/database";

const app = express();
app.use(cors(corsOptions));
const port = 8080;

// handle credentials before cors
// app.use(credentials);

// middleware for cookies
// app.use(cookieParser());


// register
app.use("/", registerRoute);
// login
app.use("/", exchangeCredentialsRoute);
// auth
app.use("/", authenticationRoute);

// app.use(express.json());
app.locals.store = new Level("./store", { valueEncoding: "json" });
// app.locals.ttl = ttl(app.locals.store);

// backend routes
app.use(verifyToken); //all routes after this are secured by middleware

// need to check if db connection is open before checking for requests
app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
