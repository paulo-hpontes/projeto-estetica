require('dotenv').config();
const port = process.env.PORT;
const portFrontEnd = process.env.PORTFRONTEND;

const express = require('express');
const app =  express();

const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Solve cors
app.use(cors({credentials: true, origin:`http://localhost:5173`}));

// database
require('./src/config/db');

// Router
const router = require('./src/routes/Router');
app.use(router);

app.listen(port, () => {
    console.log(`App rodando em: http://localhost:${port}`);
});