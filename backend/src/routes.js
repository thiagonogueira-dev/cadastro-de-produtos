const { Router } = require('express');
const router = Router();

const AuthController = require('./controller/AuthController')
const ProductController = require('./controller/ProductController')
const AuthenticateMiddlleware = require('./middllewares/authenticate');

router.post('/registro', AuthController.register);
router.post('/login', AuthController.authenticate);
router.post('/logout', AuthenticateMiddlleware, AuthController.logout);

router.post('/produto', AuthenticateMiddlleware, ProductController.createProduct);
router.get('/produto', AuthenticateMiddlleware, ProductController.getAll);
router.delete('/produto/:id', AuthenticateMiddlleware, ProductController.deleteProduct);
router.put('/produto/:id', AuthenticateMiddlleware, ProductController.updateProduct);


module.exports = router;