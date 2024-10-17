require('dotenv').config();
const mongoose = require('mongoose');

const dbConn = () => mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        return;
    }).catch( e => console.log(e));

dbConn();

module.exports = dbConn;