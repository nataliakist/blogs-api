const { Router } = require('express');

const BlogPostController = require('../controllers/BlogPostController');
const validateToken = require('../middlewares/validateToken');
const validatePostFields = require('../middlewares/validatePostFields');

const router = Router();

router.get('/', validateToken, BlogPostController.getAll);

router.post('/', validateToken, validatePostFields, BlogPostController.createPost);

module.exports = router;