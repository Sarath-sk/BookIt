const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const connectToDB = require('./db/db')
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json())

connectToDB()

app.use('/movie', require('./routes/movieRoutes'))
app.use('/email', require('./routes/email'))


app.listen(4000, ()=>console.log("Server is running on Port: 4000"))
