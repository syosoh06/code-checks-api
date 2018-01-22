const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeCheckSchema = new Schema({
    check: { type: String, required: true },
    user: { type: Object, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('CodeCheck', CodeCheckSchema);