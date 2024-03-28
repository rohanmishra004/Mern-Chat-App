const express = require('express');
const { chats } = require('./data/data');
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middlewares/ErrorMiddleware')
require('dotenv').config()
connectDB()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Api test')
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`.yellow.bold)
})