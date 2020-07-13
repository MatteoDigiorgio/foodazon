const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: { type: Array },
  userId: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);