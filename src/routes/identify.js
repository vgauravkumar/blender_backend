const router = require('express').Router();
const { createCube, changeSize, changePosition } = require('../controller/scripts');
const { getModels } = require('../controller/getModels');

router.get('/models', getModels);
router.get('/createCube', createCube);
router.put('/changeSize', changeSize);
router.put('/changePosition', changePosition);

module.exports = router;