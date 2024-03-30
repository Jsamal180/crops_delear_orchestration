const { default: mongoose } = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connectDB = mongoose.connection;
connectDB.on('error', console.error.bind(console, "Error connecting to MongoDB"));
connectDB.once('open', function(){
    console.log('Connected to DB :: MongoDB');
})
module.exports = connectDB;