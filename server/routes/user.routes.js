const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.get('/api/users/all', UserController.findAll);
    app.get('/api/user/:id', UserController.findOne);
    app.post('/api/user/new', UserController.create);
    app.put('/api/user/edit/:id', UserController.updateOne);
    app.delete('/api/user/delete/:id', UserController.deleteOne);
}

