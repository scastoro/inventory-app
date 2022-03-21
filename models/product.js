const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
  image: { type: String, required: true },
});

ProductSchema.virtual('url').get(function() {
  return '/products/' + this._id;
});

module.exports = mongoose.model('Product', ProductSchema);
