const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB =require('./server/database/connection');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// log request. or logging the messages to the node using the morgan just 
//as console did in the browser
app.use(morgan('tiny'));
app.use(express.static('public'));
//connect the database to the app by calling the function defined in the 
// database/connection.js

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));
//this just takes the json type data comes from the submitted form and process it to the regular 
//javascript we can use
app.use(express.json());
app.use(cookieParser())

// view engine ( where the parser will get the data from
// in terms of format )
app.set('view engine','ejs')
// app.set('views', path.resolve(__dirname,'views/ejs')) in case your 
// ejs files are inside the ejs folder of the views folder

connectDB();


// load assets. such that if there is a file in the css folder
// you dont need to specify its path exclusively
// just say css/file.css on the rest will be handled by 
//path module
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//To reference to the routes
app.use('/', require('./server/routes/router'));
app.use('/', require('./server/routes/authRoutes'));

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});