const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


// Un middleware necesita estas tres variables
module.exports = (req, res, next) => {
    // check if th request has a JWT
    const token = req.header;
    if (!token) return res.status(401).send("Access denied")


    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next()
    } catch (e) {
        res.status(400).send("Invalid token")
    }

}

