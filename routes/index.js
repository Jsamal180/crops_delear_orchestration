const express = require("express");
const router = express.Router();
router.use('/crops', require('./cropsRoutes'));
module.exports = router;