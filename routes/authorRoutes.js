const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { getAllAuthor, addAuthor } = require('../controllers/authorController');


router.get('/', getAllAuthor); 
router.post('/', upload.single('img'), addAuthor);

module.exports = router;

