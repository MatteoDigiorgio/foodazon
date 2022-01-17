const mongoose = require('mongoose');
const Order = require('../models/order');

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select('_id date product userId total')
    .exec()
    .then(docs => {
      res.status(200).json(
        orders = docs.map(doc => {
          return {
            _id: doc._id,
            date: doc.date,
            userId: doc.userId,
            product: doc.product,
            total: doc.total
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
        order: order
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