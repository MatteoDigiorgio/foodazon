const express = require('express');
const router = express.Router({ mergeParams: true });
const checkAuth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders')

router
  .route('/:userId')
  .get(OrdersController.orders_get_all)
  .post(checkAuth, OrdersController.orders_create_order);

router
  .route('/:orderId')
  .delete(OrdersController.orders_delete_order);

module.exports = router;