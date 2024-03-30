const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    cropsArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop'
    }]
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
