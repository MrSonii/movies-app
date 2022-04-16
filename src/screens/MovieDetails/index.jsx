import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "axios";

import "./styles.css";

export default function MovieDetail() {
  const params = useParams();

  const [movieData, setMovieData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const resp = await get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=61beac6430ea7906d08c6db652d25f36`
        );

        console.log(resp.data);
        setMovieData(resp.data);
      } catch (err) {
        alert(err.message);
      }
    })();
  }, []);

  if (!movieData) {
    return <h1 className="loading">Loading...</h1>;
  }
  return (
    <div className="app">
      <div>
        <img
          className="movie-img"
          src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
          alt={movieData.title}
        />
      </div>
    </div>
  );
}
