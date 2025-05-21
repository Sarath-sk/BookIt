const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  availableSeats: { type: Number, required: true, min: 0 },
  screeningDate: { type: Date, required: true },
  screeningTime: { type: String, required: true }, // store time as HH:MM format
  theatreLocation: { type: String, required: true },
  genre: { type: String, required: true }, 
  price: {type: Number, required: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
