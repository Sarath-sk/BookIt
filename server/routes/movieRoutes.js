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
    // console.log(req.body)
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/movies/:id/seats
router.put('/:id/seats', async (req, res) => {
  const { id } = req.params;
  const { count } = req.body; // number of tickets to decrement

  if (!count || count <= 0) {
    return res.status(400).json({ error: 'Invalid ticket count' });
  }

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    if (movie.availableSeats < count) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    movie.availableSeats -= count;
    await movie.save();

    res.status(200).json({ message: 'Seats updated successfully', updatedSeats: movie.availableSeats });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
