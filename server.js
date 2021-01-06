if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

//Declaracao/definiacao da base de dados
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
userNewUrlParser: true})
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Conectado a base de dados'))

//Fim da definiao da base de dados
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)
app.listen(process.env.PORT || 5500)