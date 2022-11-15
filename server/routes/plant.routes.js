const PlantController = require('../controllers/plant.controller');

module.exports = app => {
    app.get('/api/plants/all', PlantController.findAll);
    app.get('/api/plant/random',PlantController.findRandomPlant);
    app.get('/api/plant/:id', PlantController.findOne);
    app.post('/api/plant/new', PlantController.create);
    app.post('/api/plant/find',PlantController.findNewPlant);
    app.put('/api/plant/edit/:id', PlantController.updateOne);
    app.delete('/api/plant/delete/:id', PlantController.deleteOne);
}

