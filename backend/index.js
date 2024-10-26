const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config
require('./Models/Db')
const AuthRouter = require('./Routes/AuthRouter');
const studentRouter = require ('./Routes/Students');


app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use("/student", studentRouter);

app.get('/ping', (req, res) => {
    res.send('PONG');
});

const PORT = process.env.PORT||3000 ;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})