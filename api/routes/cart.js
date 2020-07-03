const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart')


router.get('/', CartController.cart_get_all);

router.post('/', CartController.cart_create_cartItem);

router.get('/:cartItemId', CartController.cart_get_cartItem);

//router.patch('/:cartItemId', CartController.cart_update_cartItem);

router.delete('/:cartItemId', CartController.cart_delete_cartItem);

module.exports = router;