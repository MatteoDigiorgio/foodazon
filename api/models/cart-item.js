const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1 },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  productImage: { type: String, required: true }
});

module.exports = mongoose.model('CartItem', cartSchema);