const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');
// get all workouts
const getWorkouts = async(req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// get a workout
const getWorkout = async(req, res) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({message: 'error! no such workout exists!!'})
        }else{
            const workout = await Workout.findById(id);
            if(!workout){
                res.status(404).json({
                    message: 'workout does not exists!'
                })
            }else if(workout){
                res.status(200).json(workout)
            }else{
                res.status(500).json({
                    message: 'internal server error'
                })
            }
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// create a workout
const createWorkout = async(req, res) => {
    const {title, load, reps} = req.body
    // add doc to DB
    try{
        const workout = await Workout.create({
            title, load, reps
        })
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// update a workout
const updateWorkout = async(req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({message: 'error! no such workout exists!!'})
        }else{
            const workout = await Workout.findOneAndUpdate({_id: id}, {
                ...req.body
            })
            if(!workout){
                res.status(404).json({
                    message: 'workout does not exists!'
                })
            }else if(workout){
                res.status(200).json({
                    message: 'workout updated successfully'
                })
            }else{
                res.status(400).json({
                    message: 'internal server error'
                })
            }
        }
    }catch(error){
        res.status(500).json(error);
    }
}

// delete a workout
const deleteWorkout = async(req, res) => {
    const { id } = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({message: 'error! no such workout exists!!'})
        }else{
            const workout = await Workout.findByIdAndDelete({_id: id});
            if(!workout){
                res.status(404).json({
                    message: 'workout does not exists!'
                })
            }else if(workout){
                res.status(200).json({
                    message: 'workout deleted successfully'
                })
            }else{
                res.status(400).json({
                    message: 'internal server error'
                })
            }
        }
    }catch(error){
        res.status(500).json(error);
    }
    
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
}