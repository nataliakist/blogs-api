const { Router } = require('express');

const BlogPostController = require('../controllers/BlogPostController');
const validateToken = require('../middlewares/validateToken');
const validatePostFields = require('../middlewares/validatePostFields');

const router = Router();

router.get('/', validateToken, BlogPostController.getAll);

router.get('/:id', validateToken, BlogPostController.getById);

router.put('/:id', validateToken, BlogPostController.updateById);

router.post('/', validateToken, validatePostFields, BlogPostController.createPost);

module.exports = router;