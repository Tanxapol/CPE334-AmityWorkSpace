const { readdirSync } = require('fs')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

readdirSync('./routes').map((c) => {
    app.use('/api/' + c.replace('.js', ''), require('./routes/' + c))
})

app.listen(2000, () => console.log('Server is running on port 2000'))