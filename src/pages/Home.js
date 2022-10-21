import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/button";

import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

import { category, movieType, tvType } from "../api/tmdbApi";

function Home() {
  return (
    <>
      <HeroSlide></HeroSlide>
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList
            category={category.movie}
            type={movieType.popular}
          ></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList
            category={category.movie}
            type={movieType.top_rated}
          ></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular}></MovieList>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated}></MovieList>
        </div>
      </div>
    </>
  );
}

export default Home;
