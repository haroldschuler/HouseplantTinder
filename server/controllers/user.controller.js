const { User } = require('../models/user.model');

// Finds all instances of User
module.exports.findAll = (req, res) => {
    User.find().sort({name: 'asc'})
        .then(allUsers => {
            res.json(allUsers)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Finds one user by ID
module.exports.findOne = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Creates a new User instance
module.exports.create = (req, res) => {
    User.create(req.body)
        .then(newUser => {
            res.json(newUser)
        })
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

// Edits a User instance by ID
module.exports.updateOne = (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
        )
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

// Deletes a User instance by ID
module.exports.deleteOne = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
            res.json(deletedUser);
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}