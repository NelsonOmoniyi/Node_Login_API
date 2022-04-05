const { append } = require('express/lib/response');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorisation"];
    const token = authHeader && authHeader.spilt(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(take, "SecretKey", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateAccessToken(username) {
    return jwt.sign({ data: username }, "SecretKey", {
        expiresIn: "2h",
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
};