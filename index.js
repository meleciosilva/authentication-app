const express = require("express");
const app = express();
const port = 5000;
const jwt = require("jsonwebtoken");

const listener = () => console.log(`Server up and running on port ${port}`);

app.use(express.json());

const secret = "tHEBigseCrETheRE";

app.post("/create-token", (req, res) => {
  const { id, username } = req.body;
  
  const payload = {
    username,
    id
  }
  const expiry = 36000;

  jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
    if (err) return res.status(500).json({ err });
    return res.json({ token });
  });
});

app.get("/decode-token", (req, res) => {
  if (!req.headers.authorization) return res.status(403).json({ message: "Authorization token is required" });
  
  const authHeader = req.headers.authorization;
  const splittedString = authHeader.split(" ");
  const token = splittedString[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) return res.status(500).json({ err });
    res.json({ "user": decodedToken });
  });
});

app.listen(port, listener);