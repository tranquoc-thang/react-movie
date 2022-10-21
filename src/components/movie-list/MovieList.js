import React, { useState, useEffect } from "react";

import "./movie-list.scss";
import PropTypes from "prop-types";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

import Button from "../button/button";
import apiConfig from "../../api/apiConfig";
import tmdbApi, { category } from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        autoplay={{ delay: 3000 }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category}></MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
