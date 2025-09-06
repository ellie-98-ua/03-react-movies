import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

interface FetchMoviesResponse {
  results: Movie[];
}

const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

if (!token) {
  console.warn("TMDB token is missing. Set VITE_TMDB_TOKEN in environment.");
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  const { data } = await api.get<FetchMoviesResponse>("/search/movie", {
    params: { query, language: "en-US", page: 1 },
  });
  return data.results;
}
