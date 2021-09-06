const express = require('express');
let router = express.Router();
const upload = require('../middlewares/upload')

let controller = require('../controllers/controller')

router.get('/',controller.index);

router.post('/uploadCSV',upload.single("file"),controller.uploadCSV);

router.get('/getAll',controller.getAll);

module.exports = router;