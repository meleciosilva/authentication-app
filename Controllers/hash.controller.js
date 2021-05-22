const crypto = require("crypto");
const bcrypt = require("bcrypt");


const comparePass = (req, res) => {
  if (!req.body.pass) return res.status(400).json({ message: "The 'pass' key is required" });
  
  const saltRounds = 10;
  const plainText = "ReskillAmericans123";
  
  bcrypt.genSalt(saltRounds) // generate salt and iterate 2^saltRounds
    .then(salt => bcrypt.hash(plainText, salt)) // generate hash with salt added
    .then(hash => bcrypt.compare(req.body.pass, hash)) // compare 'pass' with hash
    .then(data => res.send(data)) // send true or false
    .catch(err => console.log(err));
}

module.exports = {
  comparePass
}