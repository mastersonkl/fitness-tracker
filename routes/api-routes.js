const Workout = require("../models/workoutLogic.js");

module.exports = function (app) {
    app.get("/api/workouts", (req, res) => {
        Workout.find({})
            .then((results) => {
                res.json(results);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    });

    app.post("/api/workouts", ({ body }, res) => {
        console.log(body);
        Workout.create(body)
            .then((results) => {
                res.json(results);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    });

    app.put("/api/workouts/:id", ({ params, body }, res) => {
        Workout.findByIdAndUpdate(
            { _id: params.id },
            { $push: { exercises: [body] } },
            { $inc: { totalDuration: body.duration } }
        )
            .then(() => {
                Workout.findOne({ _id: params.id }).then((results) => {
                    res.json(results);
                });
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        Workout.find({})
            .then((results) => {
                res.json(results);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    });
};