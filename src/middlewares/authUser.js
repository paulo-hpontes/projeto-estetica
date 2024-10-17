require('dotenv').config();

const User = require('../models/User');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authUser = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)return res.status(401).json({errors: ['Acesso negado!']});

    try{
        const verify = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verify.id).select('-password');
        next();
    }catch(e){
        res.status(401).json({errors: ['Token inválido.']});
    }
}

module.exports = authUser;