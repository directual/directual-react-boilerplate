const path = require('path');
const express = require('express');
const proxy = require('../src/setupProxy')
const SERVER_PORT = 8080;

const app = express();
app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
proxy(app)

const server = app.listen(SERVER_PORT, () => {
    console.log(`start webserver: http://localhost:${SERVER_PORT} \nAPP ID: ${process.env.APP_ID} `);
});

module.exports = app;
