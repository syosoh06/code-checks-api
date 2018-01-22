const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
   name: { type: String, required: true },
   user: { type: Object, required: true }
});

module.exports = mongoose.model('Project', ProjectSchema);