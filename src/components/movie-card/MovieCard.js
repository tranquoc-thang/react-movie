import "./movie-card.scss";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Button from "../button/button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ background: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

MovieCard.propTypes = {};

export default MovieCard;
