const mongoose = require('mongoose');
const {Schema} = mongoose

const TaskSchema = new Schema({
    description: {type: String, required: true}
});

module.exports = mongoose.model('Task', TaskSchema);
