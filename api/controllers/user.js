const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(userDoc => {
      if (userDoc.length >= 1) {
        return res.status(409).json({
          message: 'Mail used'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const token = jwt.sign({
              email: userDoc.email,
              userId: userDoc._id
            },
              process.env.JWT_KEY
            );
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash,
              isMerchant: req.body.isMerchant,
              token: token
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'Auth successful',
                  _id: result._id,
                  username: result.username,
                  email: result.email,
                  password: result.password,
                  isMerchant: result.isMerchant,
                  token: result.token
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    })
}

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.json({
          message: 'Auth failed'
        }).status(401)
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.json({
            message: 'Auth failed'
          }).status(401)
        }
        if (result) {
          return res.json({
            message: 'Auth successful',
            userId: user[0]._id,
            username: user[0].username,
            email: user[0].email,
            isMerchant: user[0].isMerchant,
            token: user[0].token
          }).status(200)
        }
        return res.json({
          message: 'Auth failed'
        }).status(401)
      })
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      }).status(500);
    });
}

exports.user_update = (req, res, next) => {
  const id = req.params.userId;
  User.updateOne({ _id: id }, {
    $set: {
      username: req.body.username,
      email: req.body.email
    }
  })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User updated',
        username: req.body.username,
        email: req.body.email
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: err
      }).status(500);
    });
}

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

