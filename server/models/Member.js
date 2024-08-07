const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  fullname: { type: String, required: true },
  role: { type: String, required: true },
  address: { type: String, required: true }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
