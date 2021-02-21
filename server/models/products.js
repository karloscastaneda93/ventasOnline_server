const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: String,
    description: String,
    images: [Object],
    price: Number,
    category: String,
    stock: Boolean,
    tags: [String],
    attributes: {
        color: String,
        size: String
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;