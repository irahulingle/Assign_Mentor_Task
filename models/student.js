const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  mentor: { type: Schema.Types.ObjectId, ref: 'Mentor', default: null },
  previousMentors: [{ type: Schema.Types.ObjectId, ref: 'Mentor' }]
});

module.exports = mongoose.model('Student', StudentSchema);
