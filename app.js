const { response, request } = require('express');
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const { engine } = require('express-handlebars');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/database');
const morgan = require('morgan');

// database connect
dotenv.config({ path: './config/.config.env'})

const app = express()

// body parse middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// init middleware
app.use(logger);

// use database connectivity
connectMongoDB();

// morgan set up
if (process.env.NODE_ENV = 'development') {
  app.use(morgan('dev'));
}

// handlebar middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");


const port = process.env.PORT || 5000
const storiesRoute = require('./routes/stories')
// 2. setup static and middleware
app.use(express.static(path.join(__dirname, './public')));

// routes/api folder routes
// app.use('/api/finstocks', require('./routes/api/finstocks'));
app.use('/', require('./routes/index'));
app.use('/stories', storiesRoute);

app.all('*', function(request, response){
  response.status(404).send('Resource Not Found')
})

app.listen(port, function() {
  console.log(`Server listening on port ${process.env.NODE_ENV} mode on ${port}...`)
})

