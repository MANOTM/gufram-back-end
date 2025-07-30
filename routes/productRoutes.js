const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { getAllProducts, oneProduct, addProduct } = require('../controllers/productController');


router.get('/', getAllProducts);
router.get('/:id', oneProduct);
router.post('/', upload.single('img'), addProduct);

module.exports = router;

