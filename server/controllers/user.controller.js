const { User } = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Finds all instances of User
module.exports.findAll = (req, res) => {
    User.find()
        .then(allUsers => {
            res.json(allUsers)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// USED FOR AUTHENTICATION -- finds a user by an extracted ID
module.exports.findUser = (req,res) => {
    // I'm not proud of what I did here
    const usertokenArr = req.rawHeaders[req.rawHeaders.length-3].split("usertoken=");
    const userObj = jwt.decode(usertokenArr[1])
    const userId = userObj["id"]

    User.findById(userId)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Finds one user by ID
module.exports.findOneById = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// Finds one user based on generic request input
module.exports.findOne = (req,res) => {
    User.find(req.body)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.json({message: 'Something went wrong', error: err}));
}

// LOGIN
module.exports.login = async(req,res) => {
    const user = await User.findOne({email: req.body.email});

    if(user === null) {
        return res.sendStatus(400);
    }
    
    const correctPassword = await bcrypt.compare(req.body.password,user.password);

    if(!correctPassword) {
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({id: user._id},process.env.LOGIN_KEY);
    res.cookie("usertoken", userToken, {httpOnly: true}).json({msg: "success",id: user._id})
}

// REGISTER --- Creates a new User instance
module.exports.register = (req, res) => {
    User.create(req.body)
        .then(newUser => {
            const userToken = jwt.sign({id: newUser._id},process.env.LOGIN_KEY);

            res.cookie("usertoken", userToken, {httpOnly: true}).json({msg: "success", user: newUser})
        })
        .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
}

// // Register a user -- REPLACE create function above once implemented
// module.exports.create = (req, res) => {
//     User.create(req.body)
//         .then(newUser => {
//             res.json({msg: "Success", user: newUser})
//         })
//         .catch(err => res.status(400).json({message: 'Something went wrong', error: err}));
// }

// LOGOUT
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
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