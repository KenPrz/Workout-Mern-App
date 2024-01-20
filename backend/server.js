
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');



//express app
const app = express();

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts',workoutRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('Connected to DB and now listening on port 4000');
        })
    })
    .catch((error)=>{
        console.log(error);
    })


