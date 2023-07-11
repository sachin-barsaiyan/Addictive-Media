const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
