import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setHasError(false);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setMovies(results);
        toast.success(`Found ${results.length} movies!`);
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
      toast.error("Error fetching movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    console.log("Selected movie:", movie);
  };

  return (
    <div className={css.app}>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {hasError && <ErrorMessage />}
      {!isLoading && !hasError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
