const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    wishlist: {
        type: Array,
        default: []
    },
    owned: {
        type: Array,
        default: []
    },
    swiped: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports.User = mongoose.model('User',UserSchema);