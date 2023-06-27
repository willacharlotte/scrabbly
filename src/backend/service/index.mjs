import ttl from "level-ttl";
import express from "express";
import { Level } from "level";

import createCredentialsHandler from "./handlers/create-credentials.mjs";
import exchangeCredentialsHandler from "./handlers/exchange-credentials.mjs"
import bearer from "./middleware/verify-bearer.mjs";

const app = express();
const port = 8080;

// app.use(express.json());
app.locals.store = new Level('./store', { valueEncoding: 'json' })
// app.locals.ttl = ttl(app.locals.store);

app.post("/create-credentials", createCredentialsHandler);
app.post("/exchange-credentials", exchangeCredentialsHandler);
app.get("/check-authentication", bearer, (request, response) => response.send("`You're authenticated!"));

app.listen(port, () => {
    console.log(`app listening on ${port}`);
  });