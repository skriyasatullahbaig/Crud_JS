const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/AliensDBex';  

const app = express();

mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB...');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const con = mongoose.connection;

con.on('open', function(){
    console.log('Connection open...');
});

app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
