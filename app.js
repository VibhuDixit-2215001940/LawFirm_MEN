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
const checkerRoutes = require('./routes/checker'); 
const adminRoutes = require('./routes/admin');
const firRoutes = require('./routes/fir');
const profileRoutes = require('./routes/profile');
const callRoutes = require('./routes/call');
const lawyerRoutes = require('./routes/lawyer');

app.use(session({// Session middleware should be initialized before routes
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(cors());  // Middleware setup
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));  // Use express.urlencoded to parse URL-encoded data
app.use(bodyParser.json());  // Parse JSON data


app.get('/', (req, res) => {// Render home page
    res.render('home/index');  
});


app.use(loginRoutes);// Use routes
app.use(adminRoutes)
app.use(checkerRoutes);  
app.use(firRoutes);
app.use(profileRoutes)
app.use(callRoutes)
app.use(lawyerRoutes);

mongoose.connect('mongodb://localhost:27017/lawfirm')// MongoDB connection
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/Error', (req, res) => {// 404 route
    res.render('404/index');  // Render 404 page if route doesn't exist
});


app.get('*', (req, res) => {// 404 route
    res.render('404/index');  // Render 404 page if route doesn't exist
});


app.listen(8000, () => {// Start the server
    console.log("Listening at port 8000!");
});
