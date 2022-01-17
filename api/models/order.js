const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Date },
  userId: { type: String },
  product: { type: Array },
  total: { type: Number }
});

module.exports = mongoose.model('Order', orderSchema);