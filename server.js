if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const indexRouter = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', () => console.error('Connected to Mongoose'));
const userRoutes = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRoutes);

app.listen(process.env.PORT || 3000);