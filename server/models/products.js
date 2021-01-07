const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: String,
    description: String,
    images: [Object],
    color: String,
    size: String,
    price: Number,
    category: String,
    stock: Boolean
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;