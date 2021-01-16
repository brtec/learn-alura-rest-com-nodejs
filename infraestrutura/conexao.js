'use strict'
const mysql = require('mysql')
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'learn-alura-rest-com-nodejs'
})


module.exports = conexao