const { Router } = require('express');
const router = Router();

const UserController = require('./controller/UserController')

router.post('/usuario', UserController.createUser);
router.put('/usuario/:id', UserController.updateUser);
router.get('/usuario', UserController.listUsers);
router.delete('/usuario/:id', UserController.deleteUser);

module.exports = router;