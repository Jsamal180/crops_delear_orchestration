const express = require("express");
const router = express.Router();
const cropsController = require('../../controller/cropsController');

router.post('/addCrop', cropsController.addCrops);
router.delete('/deleteCrop', cropsController.deleteCrops);
router.post('/updateCrops', cropsController.modifyCrops);
router.get('/getCrop', cropsController.readCrops);

module.exports = router;