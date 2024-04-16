const express = require('express')
const mongoose = require('mongoose')
const apiRoutes = require('./api/API')
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('hello world')
})
// mongoose.connect(process.env.MONGO_URI)
// .then((res) => {
//     console.log('mongodb connected')
//     app.use('/api', apiRoutes)
// })
// .catch((err) => {
//     console.log('err in mongo connection', err)
// })


app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`))