const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorSchema = new Schema({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Mentor', MentorSchema);
