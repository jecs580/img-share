const express = require('express');
const config = require('./server/config');
// Database
require('./db');

const app = config(express());

// Starting the Server
app.listen(app.get('port'),()=>{
    console.log('Servidor en puerto', app.get('port'));
});