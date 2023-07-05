const { Router } = require('express');

const BlogPostController = require('../controllers/BlogPostController');
const validateToken = require('../middlewares/validateToken');
const validatePostFields = require('../middlewares/validatePostFields');

const router = Router();

router.post('/', validateToken, validatePostFields, BlogPostController.createPost);

module.exports = router;