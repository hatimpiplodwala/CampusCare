const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mentalHealthStatus: { type: String, default: 'Good' },
  fitnessData: {
    steps: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 }
  },
  appointments: [{ type: String }],
  articles: [{ type: String }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
