const jwt = require("jsonwebtoken");
const secret = "tHEBigseCrETheRE";

const signToken = (req, res) => {
  const { firstName, lastName, id } = req.body;
  const requiredKeys = ["firstName", "lastName", "id"];
  
  requiredKeys.forEach(key => {
    if (!req.body[key]) {
      const error = `A '${key}' property is required.`;
      return res.status(400).json({ message: error });
    }
  });

  const payload = {
    firstName,
    lastName,
    id
  }

  const expiry = 36000;

  jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
    if (err) return res.status(500).json({ err });
    return res.json({ token });
  });
}

const decodeToken = (req, res) => {
  if (!req.headers.authorization) return res.status(403).json({ message: "Authorization token is required" });  
  const authHeader = req.headers.authorization;
  const splittedString = authHeader.split(" ");

  if (splittedString[0] !== "Bearer") {
    return res.status(400).json({ message: "Token must be formatted correctly: 'Bearer <header>.<payload>.<signature>'" });
  }
  const token = splittedString[1];

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) return res.status(500).json({ err });
    res.json({ "user": decodedToken });
  });
}

module.exports = {
  signToken,
  decodeToken
}