const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

//Requring Routes Files
const home = require('./routes/home')
const riverrat = require('./routes/riverrat')
const sethplayer = require('./routes/sethplayer')
const hogs99 = require('./routes/hogs99')
const jackson123 = require('./routes/jackson123')
const goodguys = require('./routes/goodguys')
const austin2 = require('./routes/austin2')
const htownrc = require('./routes/htownrc')
const randyclay = require('./routes/randyclay')
const woodyma = require('./routes/woodyma')
const chancexiii = require('./routes/chancexiii')

//Using Routes
app.use('/',home)
app.use('/riverrat',riverrat)
app.use('/sethplayer',sethplayer)
app.use('/hogs99',hogs99)
app.use('/jackson123',jackson123)
app.use('/goodguys',goodguys)
app.use('/austin2',austin2)
app.use('/htownrc',htownrc)
app.use('/randyclay',randyclay)
app.use('/woodyma',woodyma)
app.use('/chancexiii',chancexiii)

//Setting View Engine
app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'))


app.listen(process.env.PORT || 3000)

