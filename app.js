const { response, request } = require('express');
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const { engine } = require('express-handlebars');
const finstocks = require('./Finstocks');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/database');

// database connect
dotenv.config({ path: './config/.config.env'})

const app = express()

// init middleware
app.use(logger);

// use database connectivity
connectMongoDB();

// handlebar middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

// body parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// home page route for the handlebars
app.get('/', function(request, response){
  response.render('index', {
    title: 'finTech App',
    finstocks: finstocks
  })
});

const port = process.env.PORT || 5000
// 2. setup static and middleware
// app.use(express.static(path.join(__dirname, './public')));

// routes/api folder routes
app.use('/api/finstocks', require('./routes/api/finstocks'));

app.all('*', function(request, response){
  response.status(404).send('Resource Not Found')
})

app.listen(port, function() {
  console.log(`Server is listening on port ${port}....`)
})

