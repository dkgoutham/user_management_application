const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({path: 'config.env'});
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./server/database/connection')

const app = express();
app.use(morgan('tiny'));

//database connection

connectDB();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));


const PORT = process.env.PORT||8080;

//load routers from routes file
const router = require('./server/routes/router');
app.use(router);


app.listen(PORT, ()=>{
    console.log(`listening to http://localhost:${PORT}`);
})