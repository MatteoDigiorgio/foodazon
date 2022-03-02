const mongoose = require('mongoose');
const Order = require('../models/order');

exports.orders_get_all = (req, res, next) => {
  Order.find().or([{ 'userId': req.params.userId }, { 'product.merchant_id': req.params.userId }])
    .select('_id date userId product total')
    .exec()
    .then(docs => {
      res.status(200).json(
        orders = docs.map(doc => {

          products = []
          total = 0

          products = doc.product.filter(o => o.merchant_id === req.params.userId)

          if (products.length === 0) {
            products = doc.product
            total = doc.total
          } else {
            for (i = 0; i < products.length; i++) {
              total += products[i].price * products[i].qty
            }
          }

          return {
            _id: doc._id,
            date: doc.date,
            userId: doc.userId,
            product: products,
            total: total
          }
        })
      );
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.orders_create_order = (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    date: req.body.date,
    userId: req.body.userId,
    product: req.body.product,
    total: req.body.total
  })
  order
    .save()
    .then(result => {
      res.json({
        _id: order._id,
        date: order.date,
        userId: order.userId,
        product: order.product,
        total: order.total
      }).status(200)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.orders_patch_product_order_status = (req, res, next) => {
  const filters = { _id: req.body.orderCode, product: { $elemMatch: { productId: req.body.productCode } } }
  const update = { $set: { "product.$.status": req.body.newStatus } }

  Order.findOneAndUpdate(filters, update, { useFindAndModify: false })
    .then(res.status(200))
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}


exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}