const router = require('express').Router();
const { generateModel } = require('../controller/generateModel');
const { getModels } = require('../controller/getModels');

router.get('/models', getModels);
router.get('/generate-model', generateModel);

module.exports = router;