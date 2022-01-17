const mongoose = require('mongoose');
const Product = require('../models/product');
const fs = require('fs');

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select('name price _id description image merchant_id')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            description: doc.description,
            image: doc.image,
            _id: doc._id,
            merchant_id: doc.merchant_id
          }
        })
      }
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No entries found'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.products_create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.file.destination + "/" + req.file.filename,
    merchant_id: req.body.merchant_id
  });
  console.log(product);
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Created product successfully',
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          description: result.description,
          image: result.image,
          merchant_id: result.merchant_id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      }).status(500);
    });

}

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select(' name description price _id image merchant_id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          _id: doc._id,
          name: doc.name,
          price: doc.price,
          img: doc.image,
          description: doc.description,
          merchant_id: doc.merchant_id
        })
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  Product.updateOne({ _id: id }, {
    $set: {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    }
  })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product updated'
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      }).status(500);
    });
}

exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}