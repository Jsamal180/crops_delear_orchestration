const connectDB = require('../config/mongoDBConfig');
const User = require('../models/userModel');
const Crop = require('../models/cropsModel');

module.exports.addCrops = async(req, res) => {
    try {
        const { userId, cropname, croptype, description } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newCrop = new Crop({
            cropname,
            croptype,
            description
        });
        const savedCrop = await newCrop.save();
        user.cropsArray.push(savedCrop._id);
        await user.save();
        res.status(201).json({ message: 'Crop added and linked to user successfully', crop: savedCrop });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.deleteCrops = async (req, res) => {
    try {
        const { userId, cropId } = req.body;
        if (!userId || !cropId) {
            return res.status(400).json({ error: 'User ID and Crop ID are required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        const index = user.cropsArray.indexOf(cropId);
        if (index !== -1) {
            user.cropsArray.splice(index, 1);
            await user.save();
        }
        await Crop.findByIdAndDelete(cropId);

        res.status(200).json({ message: 'Crop deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.modifyCrops = async (req, res) => {
    try {
        const { userId, cropId, cropname, croptype, description } = req.body;
        if (!userId || !cropId || (!cropname && !croptype && !description)) {
            return res.status(400).json({ error: 'User ID, Crop ID, and at least one field to update are required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const crop = await Crop.findOne({ _id: cropId, userId: userId });
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found or does not belong to the user' });
        }
        if (cropname) crop.cropname = cropname;
        if (croptype) crop.croptype = croptype;
        if (description) crop.description = description;
        const updatedCrop = await crop.save();

        res.status(200).json({ message: 'Crop updated successfully', crop: updatedCrop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.readCrops = async (req, res) => {
    try {
        const { cropId } = req.body;
        if (!cropId) {
            return res.status(400).json({ error: 'Crop ID is required' });
        }
        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        res.status(200).json({ crop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports.getUserIdsByCropName = async (req, res) => {
    try {
        const { cropName } = req.body;
        if (!cropName) {
            return res.status(400).json({ error: 'Crop name is required' });
        }
        const crops = await Crop.find({ cropname: cropName });
        const userIds = crops.map(crop => crop.userId);
        res.status(200).json({ userIds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


