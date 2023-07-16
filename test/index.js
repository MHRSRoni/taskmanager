const { sign, verify } = require("jsonwebtoken");

const token = sign({roni : "roni"}, "roni", {expiresIn : "7d"})

console.log(token)

const data = verify(token, "roni")

console.log(data)