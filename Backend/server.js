const express = require('express');
const app = express();
const connectDB = require('./config/db');


// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false}));

app.get('/', (req, res) => {
    res.send("JAS SUM NAJACIII");
});

// Import and use routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));