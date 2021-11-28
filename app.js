const { response, request } = require('express');
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const dotenv = require('dotenv');
const connectMongoDB = require('./config/database');
const morgan = require('morgan');
const Blog = require('./models/Blog')

// database connect
dotenv.config({ path: './config/.config.env'})

const app = express()

// body parse middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectMongoDB();

// morgan set up
if (process.env.NODE_ENV = 'development') {
  app.use(morgan('dev'));
}

// register ejs view engine 
app.set('view engine', 'ejs');

const port = process.env.PORT || 5000
// 2. setup static and middleware
app.use(express.static(path.join(__dirname, './public')));

// 3. link the views files
app.get('/', function(request, response){
  response.redirect('/blogs');
})

app.get('/about', function(request, response){
  response.render('about',  {title: "About"});
})

// blog routes
app.get('/blogs', function(request, response){
  Blog.find().sort({ createdAt: -1 }).then(function(result){
    response.render('index', { title: 'All Blogs', blogs: result })
  }).catch(function(error){
    console.log(error);
  })
})

app.post('/blogs', function(request, response){
  const blog = new Blog(request.body);
  blog.save().then(function(result){
    response.redirect('/blogs');
  }).catch(function(error){
    console.log(error);
  })
});

app.get('/blogs/create', function(request, response){
  response.render('create',  {title: "Create a new blog"});
})

app.use(function(request, response){
  response.status(404).render('404')
});

app.listen(port, function() {
  console.log(`Server listening on port ${process.env.NODE_ENV} mode on ${port}...`)
})


