const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

//Requring Routes Files
const home = require('./routes/home')
const riverrat = require('./routes/riverrat')

//Using Routes
app.use('/',home)
app.use('/riverrat',riverrat)

//Setting View Engine
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))


app.listen(process.env.PORT || 3000)

