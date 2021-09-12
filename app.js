const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

//Requring Routes Files
const home = require('./routes/home')
const riverrat = require('./routes/riverrat')
const sethplayer = require('./routes/sethplayer')
const hogs99 = require('./routes/hogs99')
const jackson123 = require('./routes/jackson123')

//Using Routes
app.use('/',home)
app.use('/riverrat',riverrat)
app.use('/sethplayer',sethplayer)
app.use('/hogs99',hogs99)
app.use('/jackson123',jackson123)

//Setting View Engine
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))


app.listen(process.env.PORT || 3000)

