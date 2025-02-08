const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const app = express()
const postRoutes = require ('./routes/posts')
const cors = require('cors')

//app middleware
app.use(bodyParser.json())
app.use(cors());

//ROUTE middleware
app.use('/api', postRoutes);

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