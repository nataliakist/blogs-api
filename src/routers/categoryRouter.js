const { Router } = require('express');

const CategoryController = require('../controllers/CategoryController');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');

const router = Router();

router.get('/', validateToken, CategoryController.getAll);

router.post('/', validateToken, validateName, CategoryController.createCategory);

module.exports = router;