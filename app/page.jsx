"use client";

import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./api";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pb-7 sm:p-2" key={i}>
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 bg-white flex flex-col justify-between h-full">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="px-6 py-4 flex-grow">
              <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Release Date:</span>{" "}
                {movie.release_date}
              </p>
              <p className="text-red-600 mb-1">
                <span className="font-semibold ">Rating:</span>{" "}
                {movie.vote_average}
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-100">
              <button className="text-indigo-500 hover:text-indigo-700 font-bold">
                View Details
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 sm:p-24">
      <h2 className={`text-4xl lg:text-5xl font-semibold mb-12`}>POPULAR MOVIE</h2>

      {/* Search */}
      <div className="w-full md:w-3/4 lg:w-3/5 relative">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 outline-none"
          placeholder="Search movies"
          onChange={({ target }) => search(target.value)}
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      {/* Card Movies */}
      <div className="flex flex-wrap justify-center mt-5">
        <PopularMoviesList />
      </div>
    </main>
  );
}
