require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const app = require('./app')

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})