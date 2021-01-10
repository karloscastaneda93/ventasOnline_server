const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    surname: String,
    fb: String,
    recolector: String
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;