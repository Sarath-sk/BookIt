export interface IFormData {
  name: string;
  email: string;
  seats: string;
}


export interface IMovie {
  _id?: string; // Optional – returned by MongoDB
  title: string;
  availableSeats: number;
  screeningDate: string; // ISO format date string (e.g., "2025-07-15")
  screeningTime: string; // e.g., "20:00"
  theatreLocation: string;
  genre: string; // Multiple genres
  createdAt?: string; // Optional – if using timestamps
  updatedAt?: string;
}
