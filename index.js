const express = require("express");
const app = express();
const port = 5000;
const jwtController = require("./Controllers/jwt.controller");
const hashController = require("./Controllers/hash.controller");

const listener = () => console.log(`Server up and running on port ${port}`);

app.use(express.json());

app.post("/sign-token", jwtController.signToken);
app.get("/decode-token", jwtController.decodeToken);

app.post("/log-in", hashController.comparePass);

app.listen(port, listener);