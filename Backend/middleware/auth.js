const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
    const token = req.header('Authorization-token');

    if(!token) {
        return res.status(401).json({ msg: "There's no token"});
    }
    try {
        const decoded = jwt.verify(token, config.get('jwt_secret'));
        req.user = decoded.user;
        return next();
    } catch(err) {
        console.log(err.message);
        return res.status(401).json("Invalid token");
    }
    

}