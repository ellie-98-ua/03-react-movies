import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import css from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    const results = await fetchMovies(query);
    setMovies(results);
  };

  return (
    <div className={css.app}>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
}
