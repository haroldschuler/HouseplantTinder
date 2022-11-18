const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    // This route is to test
    app.get('/api/users/all', UserController.findAll);

    app.post('/api/user/login', UserController.login);
    app.post('/api/user/register', UserController.register);
    app.get('/api/users', authenticate, UserController.findAll);
    app.get('/api/user/findUser', authenticate, UserController.findUser);
    app.get('/api/user/logout', UserController.logout)
    app.get('/api/user/:id', UserController.findOneById);
    app.put('/api/user/edit/:id', UserController.updateOne);
    app.delete('/api/user/delete/:id', UserController.deleteOne);
}

