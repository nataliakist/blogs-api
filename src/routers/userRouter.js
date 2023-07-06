const { Router } = require('express');

const UserController = require('../controllers/UserController');
const validateEmail = require('../middlewares/validateEmail');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.get('/:id', validateToken, UserController.getById);

router.get('/', validateToken, UserController.getAll);

router.post('/', validateEmail, validateUser, UserController.createUser);

router.delete('/me', validateToken, UserController.deleteByToken);

module.exports = router;