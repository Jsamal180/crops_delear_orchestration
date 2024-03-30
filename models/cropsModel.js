const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cropname: {
        type: String,
        required: true
    },
    croptype: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Crop = mongoose.model('Crop', cropSchema);
module.exports = Crop;
