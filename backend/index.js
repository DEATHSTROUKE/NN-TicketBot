process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const {Orders, Events} = require("./models/models");

const PORT = process.env.PORT || 5000
app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../react-app/build')))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

