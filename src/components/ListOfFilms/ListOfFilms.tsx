import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ListOfFilms.module.css";
import Pagination from "../Pagination/Pagination";
import { Film, FilmId } from "./types";
import { useNavigate } from "react-router-dom";
import SelectYear from "../SelectYear/SelectYear";
import SelectRating from "../SelectRating/SelectRating";
import { useFilters } from "../FilterContext/FilterContext";

const allGenres = [
  "аниме",
  "биография",
  "боевик",
  "вестерн",
  "военный",
  "детектив",
  "детский",
  "для взрослых",
  "документальный",
  "драма",
  "история",
  "комедия",
  "короткометражка",
  "криминал",
  "мелодрама",
  "мультфильм",
  "мюзикл",
  "приключения",
  "триллер",
  "ужасы",
  "фантастика",
  "фэнтези",
];

function ListOfFilms(): JSX.Element {
  const [list, setList] = useState<Film[]>([]);
  const [filmsOnPage, setFilmsOnPage] = useState<number>(50);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeGenre, setActiveGenre] = useState<string[]>('');

  const {
    selectedYearRange,
    setSelectedYearRange,
    selectedRatingRange,
    setSelectedRatingRange,
    selectedGenres,
    setSelectedGenres,
    currentPage,
    setCurrentPage,
  } = useFilters();

  const navigate = useNavigate();

  const handlePagination = (pageNumber: number): void => {
    window.scrollTo(0, 0);
    loadFilmsByPage(
      pageNumber,
      selectedYearRange,
      selectedRatingRange,
      selectedGenres
    );
    setCurrentPage(pageNumber);
  };

  const handleClickDetails = (id: FilmId): void => {
    navigate(`/film/${id}`);
  };

  const handleGenreClick = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
      setActiveGenre(activeGenre.filter((g)=>g!==genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
      setActiveGenre([...activeGenre,genre]);
    }
    setCurrentPage(1);
  };

  async function loadFilmsByPage(
    pageNumber: number,
    yearRange?: string,
    ratingRange?: string,
    genres?: string[]
  ) {
    let url = `https://api.kinopoisk.dev/v1.4/movie?page=${pageNumber}&limit=${filmsOnPage}&selectFields=poster&selectFields=id&selectFields=name&selectFields=description&selectFields=year&selectFields=rating&selectFields=genres&notNullFields=name&notNullFields=description`;
    if (yearRange && yearRange !== "all" && yearRange !== "") {
      url += `&year=${yearRange}`;
    }
    if (ratingRange && ratingRange !== "allRatings" && ratingRange !== "") {
      url += `&rating.imdb=${ratingRange}`;
    }
    if (genres && genres.length > 0) {
      const genreParams = genres
        .map((genre) => `genres.name=${genre}`)
        .join("&");
      url += `&${genreParams}`;
      console.log(url)
    }

    try {
      const response = await axios.get(url, {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_DEV_API_TOKEN },
      });
      if (response.status === 200) {
        setList(response.data.docs);
        setTotalPages(response.data.pages);
      } else {
        console.log("Не удалось получить данные, status:", response.status);
      }
    } catch (e: unknown) {
      console.error((e as Error).message);
    }
  }

  useEffect(() => {
    loadFilmsByPage(
      currentPage,
      selectedYearRange,
      selectedRatingRange,
      selectedGenres
    );
  }, [currentPage, selectedYearRange, selectedRatingRange, selectedGenres]);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <SelectYear
          onYearChange={(value: string) => {
            setSelectedYearRange(value);
            setCurrentPage(1);
          }}
        />
        <SelectRating
          onRatingChange={(value: string) => {
            setSelectedRatingRange(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className={styles.filterButtonsContainer}>
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`${styles.genreButton} ${
              activeGenre.includes(genre) ? styles.active : ""
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {list && list.length > 0 ? (
        list.map((item) => (
          <div
            className={styles.list}
            key={item.id}
            onClick={() => handleClickDetails(item.id)}
          >
            {item.poster ? (
              <img className={styles.img} src={item.poster.url} />
            ) : (
              <img
                className={styles.img}
                src="https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-logo/placeholder.svg"
              />
            )}
            <div className={styles.miniCard}>
              <span className={styles.title}>{item.name}</span>

              <span>{`Рейтинг ${item.rating.imdb}`}</span>
              <span>{`Год производства ${item.year}`}</span>
            </div>
          </div>
        ))
      ) : (
        <p>Загрузка...</p>
      )}

      <Pagination
        totalPages={totalPages}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ListOfFilms;
