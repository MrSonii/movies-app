import { get } from "axios";
import { useEffect, useState } from "react";

import "./styles.css";

function App() {
  const [allMovies, setAllMovies] = useState();

  useEffect(() => {
    (async () => {
      try {
        const resp = await get("http://localhost:8000/movies");
        const { data } = resp;

        console.log(data);

        setAllMovies(data);
      } catch (err) {
        return <h1>Loading...</h1>;
      }
    })();
  }, []);

  if (!allMovies) {
    return <h1 className="screen-center">Loading...</h1>;
  }
  return (
    <div className="app">
      {allMovies.map((movie) => (
        <div className="movie-elem" key={movie.id}>
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
