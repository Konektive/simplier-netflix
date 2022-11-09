import "./App.css";
import Movie from "./components/Movie";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=fba71e4b756b1f4f1ac09d60429ebcb6&language=en-US&page=1"
    );
    const mvs = await data.json();
    setMovies(mvs.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const letSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="Banner">Netflix</div>
        <input type="text" placeholder="Search..." onChange={letSearch} />
        <motion.div layout className="movies">
          <AnimatePresence>
            {movies
              .filter((movie) => {
                if (search === "") {
                  return movie;
                } else if (
                  movie.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return movie;
                }
              })
              .map((movie) => {
                return <Movie key={movie.id} movie={movie} />;
              })}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default App;
