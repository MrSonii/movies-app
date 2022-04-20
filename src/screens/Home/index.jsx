import { get } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "fast-fuzzy";

import "./styles.css";

// function debounce(func, time = 100) {
//   let timeout;

//   return function (...args) {
//     const ref = this;

//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), time);
//   };
// }

function App() {
  const [allMovies, setAllMovies] = useState();
  const [activeResults, setActiveResults] = useState();
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    const { value } = event.target;

    if (value !== "") {
      setQuery(value);

      const results = search(value, allMovies, {
        keySelector: ({ title }) => title,
      });

      setActiveResults(results);
    } else {
      setActiveResults(allMovies);
    }
  };

  // const debouncedQueryChange = debounce(handleQueryChange, 300);

  useEffect(() => {
    (async () => {
      try {
        const resp = await get("http://localhost:8000/movies");
        const { data } = resp;

        setAllMovies(data);
        setActiveResults(data);
      } catch (err) {
        alert(err.message);
      }
    })();
  }, []);

  const navigate = useNavigate();

  const handleScreenChange = (movie) => () => {
    navigate(`/detailPage/${movie.id}`);
  };

  if (!allMovies) {
    return <h1 className="screen-center">Loading...</h1>;
  }
  return (
    <div className="app">
      <div className="search-cont">
        <label htmlFor="search-box">Search Your Movie: </label>
        <input
          className="search-box"
          id="search-box"
          type="text"
          onChange={handleQueryChange}
        />
      </div>
      {activeResults.map((movie) => (
        <div
          className="movie-elem"
          key={movie.id}
          onClick={handleScreenChange(movie)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} movie`}
            className="movie-img"
          ></img>
          <p>{movie.title}</p>
          <p>
            Rating:{" "}
            {movie.vote_average === 0 ? "Not rated yet" : movie.vote_average}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
