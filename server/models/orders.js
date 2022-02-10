const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	id: Schema.Types.ObjectId,
	client: {
		id: {
			type: String
		},
		facebook: {
			type: String
		},
		name: {
			type: String
		}
	},
	products: [String],
	status: String,
	total: Number,
	recolector: String

});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;