const { Plant } = require('../models/plant.model');

// Finds all instances of Plant
module.exports.findAll = (req, res) => {
    Plant.find().sort({name: 'asc'})
        .then(allPlants => {
            res.json(allPlants)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Finds one plant by ID
module.exports.findOne = (req, res) => {
    Plant.findById(req.params.id)
        .then(plant => {
            res.json(plant)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Finds a plant that hasn't been swiped on
module.exports.findNewPlant = (req,res) => {
    Plant.find(req.body)
        .then(allPlants => {
            res.json(allPlants)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Finds one random plant
module.exports.findRandomPlant = (req, res) => {
    Plant.find()
        .then(allPlants => {
            res.json(allPlants[Math.floor(Math.random()*allPlants.length)])
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Creates a new Plant instance
module.exports.create = (req, res) => {
    Plant.create(req.body)
        .then(newPlant => {
            res.json(newPlant)
        })
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

// Edits an Plant instance by ID
module.exports.updateOne = (req, res) => {
    Plant.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
        )
        .then(updatedPlant => {
            res.json(updatedPlant);
        })
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

// Deletes an Plant instance by ID
module.exports.deleteOne = (req, res) => {
    Plant.findByIdAndDelete(req.params.id)
        .then(deletedPlant => {
            res.json(deletedPlant);
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}