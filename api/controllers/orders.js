const mongoose = require('mongoose');
const Order = require('../models/order');

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity
          }
        })
      });
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
    products: req.body.products,
    userId: req.body.userId
  })
  order
    .save()
    .then(result => {
      res.json({
        message: "ok"
      }).status(200)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found'
        })
      }
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/'
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/orders/',
          body: { productId: 'ID', quantity: 'Number' }
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}