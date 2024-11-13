const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const path = require('path');
const loginRoutes = require('./routes/login');

app.use(session({// Session middleware should be initialized before routes
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(cors());// Middleware setup
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));// Use express.urlencoded to parse URL-encoded data
app.use(bodyParser.json());


app.use(loginRoutes);// Routes


mongoose.connect('mongodb://localhost:27017/lawfirm')// MongoDB connection
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

    
app.get('/', (req, res) => {
    res.render('home/index.ejs');
});
// 404 route
app.get('*', (req, res) => {
    res.render("404/index");
});
// Start the server
app.listen(8000, () => {
    console.log("Listening at port 8000!");
});
