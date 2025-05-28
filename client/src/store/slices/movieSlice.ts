import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IMovie } from '../../components/interfaces'; // Adjust the path if needed

// ✅ Async thunk to fetch movies from the API
export const fetchMovies = createAsyncThunk<IMovie[]>(
  'movies/fetchMovies',
  async () => {
    const res = await axios.get('http://localhost:4000/movie');
    // Return the array of movies (handle .data.data structure)
    return Array.isArray(res.data.data) ? res.data.data : [];
  }
);

const sampleMovie: IMovie = {
  title: "Kingdom",
  availableSeats: 100,
  screeningDate: "2025-06-10",
  screeningTime: "19:30",
  theatreLocation: "PVR Cinemas, Delhi",
  genre: "Action"
};


// ✅ Define the initial state
interface MovieState {
  list: IMovie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  list: [sampleMovie],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // ✅ Existing synchronous reducer to manually add a movie
    addMovie: (state, action: PayloadAction<IMovie>) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

// ✅ Export both the existing addMovie action and the reducer
export const { addMovie } = movieSlice.actions;
export default movieSlice.reducer;
