import { useState } from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
