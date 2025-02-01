const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const cors = require('cors')

const app = express()

//import routes
const postRoutes = require ('./routes/posts')

//app middleware
app.use(bodyParser.json())

app.use(postRoutes)

const PORT = 8000;
const DB_URL = 'mongodb+srv://kavidu:dil18090@merncrudapp.6nl7r.mongodb.net/MernCrud?retryWrites=true&w=majority&appName=MernCrudApp'

mongoose.connect(DB_URL)
.then(() => {
    console.log('db connected')
})
.catch((err) => console.log('db connect error',err))

app.listen(PORT,() => {
    console.log(`App is running on port ${PORT}`);
})