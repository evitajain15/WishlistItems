const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

//Express
const app = express();

app.use(cors());

//Body Parser-Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,Content-Type,enctype');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Database connection
const config = require("./config/database.config");

mongoose
    .connect(config.wishlist_url,
            { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Wishlist"))
    .catch(err => console.log(err));
    
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./routes/routes')(app);

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});


