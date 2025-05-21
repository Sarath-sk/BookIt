const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');


// GET /api/movies - Get all the movies
router.get('/', async (req, res)=>{
  try {
    const moviesList = await Movie.find()
    res.json({data: moviesList})
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

// POST /api/movies - Add a new movie
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/movies/:id/seats - Decrement availableSeats by 1
router.put('/:id/seats', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    if (movie.availableSeats <= 0) {
      return res.status(400).json({ error: "No seats available" });
    }

    movie.availableSeats -= 1;
    const updatedMovie = await movie.save();

    res.json(updatedMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
