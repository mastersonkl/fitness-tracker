
const router = require("express").Router();
const Workout = require("../models/workoutLogic.js");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
      .sort({ date: 1 })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  
  router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
        console.log("req.body", req.body);
        console.log("dbWorkout", dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  router.get("/api/workouts/range", (req, res) => {
    Workout.find()
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  router.put("/api/workouts/:id", (req, res) => {
    console.log("updating exercise");
  
    const workoutId = req.params.id;
    console.log(workoutId);
    Workout.updateOne(
      { _id: workoutId },
      {
        $push: { exercises: req.body },
        $inc: { totalDuration: req.body.duration },
      },
      {
        new: true,
      }
    )
  
      .then((dbWorkout) => {
        console.log("dbWorkout", dbWorkout);
        res.json(dbWorkout);
      })
      .catch((error) => {
        res.status(400).json(err);
      });
  });
  
  module.exports = router;

