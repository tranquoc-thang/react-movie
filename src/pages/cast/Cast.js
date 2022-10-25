import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import Button, { OutlineButton } from "../../components/button/button";
import Input from "../../components/input/input";
import PageHeader from "../../components/page-header/PageHeader";

import "./cast.scss";

const Cast = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {
          page: 1,
        };
        response = await tmdbApi.people(params);
      } else {
        const params = {
          query: keyword,
          page: 1,
        };
        response = await tmdbApi.searchPeople({ params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [keyword]);

  const loadmore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      response = await tmdbApi.people({
        params,
      });
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.searchPeople({ params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  const navigate = useNavigate();

  const [search, setSearch] = useState(props.search);

  const goToSearch = useCallback(() => {
    if (search.trim().length > 0) {
      navigate(`/cast/search/${search}`);
    }
  }, [search, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };

    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [search, goToSearch]);
  return (
    <>
      <PageHeader>{"Cast"}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <>
            <div className="section mb-3">
              <div className="movie-search">
                <Input
                  type="text"
                  placeholder="Enter keyword"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="small" onClick={goToSearch}>
                  Search
                </Button>
              </div>
            </div>
            <div className="movie-grid">
              {items.map((item, i) => (
                <CastItem key={i} item={item}></CastItem>
              ))}
            </div>
            {page < totalPage ? (
              <div className="movie-grid__loadmore">
                <OutlineButton className="small" onClick={loadmore}>
                  Load more
                </OutlineButton>
              </div>
            ) : null}
          </>
        </div>
      </div>
    </>
  );
};

const CastItem = (props) => {
  return (
    <div className="cast__item">
      <div className="cast__img">
        <img src={apiConfig.w500Image(props.item.profile_path)} alt="" />
      </div>
      <div className="cast__info">
        <span>{props.item.name}</span>
      </div>
    </div>
  );
};

export default Cast;
