const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    name: {
        type: String
    },
    latinName: {
        type: String
    },
    imageURL: {
        type: String
    },
    water: {
        type: String
    },
    sunlight: {
        type: String
    },
    size: {
        type: String
    },
    tip: {
        type: String
    }
},{timestamps: true});

module.exports.Plant = mongoose.model('Plant', PlantSchema);