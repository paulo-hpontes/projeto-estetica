require('dotenv').config();

const express = require('express');
const path = require('path');
const app =  express();

const cors = require('cors');


app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Solve cors
app.use(cors());    

// database
require('./src/config/db');

// Router
const router = require('./src/routes/Router');
app.use(router);

module.exports = app;