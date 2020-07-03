const mongoose = require('mongoose');
const CartItem = require('../models/cart-item');
const Product = require('../models/product');
const product = require('../models/product');


exports.cart_get_all = (req, res, next) => {
  CartItem.find()
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        cartItems: docs.map(doc => {
          return {
            id: doc._id,
            productId: doc.product,
            name: doc.name,
            price: doc.price,
            qty: doc.qty,
            description: doc.description,
            img: doc.productImage
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

exports.cart_create_cartItem = (req, res, next) => {
  Product.findById(req.body._id)
    .then(product => {
      const cartItem = new CartItem({
        _id: mongoose.Types.ObjectId(),
        product: req.body._id,
        name: product.name,
        price: product.price,
        qty: 1,
        description: product.description,
        productImage: product.productImage
      });
      return cartItem.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'CartItem stored',
        createdCartItem: {
          _id: result._id,
          name: result.name,
          productId: result.product,
          qty: result.qty,
          price: result.price,
          description: result.description,
          img: result.productImage
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.cart_get_cartItem = (req, res, next) => {
  CarItem.findById(req.params.cartItemId)
    .populate('cartItem')
    .exec()
    .then(cartItem => {
      if (!cartItem) {
        return res.status(404).json({
          message: 'CartItem not found'
        })
      }
      res.status(200).json({
        cartItem: cartItem,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/cart/'
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

exports.cart_delete_cartItem = (req, res, next) => {
  CartItem.remove({ _id: req.params.cartItemId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'CartItem deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/cart/',
          body: { CartItemId: 'ID', quantity: 'Number' }
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