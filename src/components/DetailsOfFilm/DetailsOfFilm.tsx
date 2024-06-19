import React, { useEffect, useState } from "react";
import { Film } from "../ListOfFilms/types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./DetailsOfFilm.module.css";

function DetailsOfFilm(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filmDetails, setFilmDetails] = useState<Film | null>(null);

  async function loadDetailsOfFilm() {
    try {
      const response = await axios.get(
        `https://api.kinopoisk.dev/v1.4/movie/${id}`,
        {
          headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_DEV_API_TOKEN },
        }
      );
      if (response.status === 200) {
        setFilmDetails(response.data);
      } else {
        console.log(
          "Не удалось получить детальную информацию о фильме, status:",
          response.status
        );
      }
    } catch (e: unknown) {
      console.error((e as Error).message);
    }
  }

  useEffect(() => {
    loadDetailsOfFilm();
  }, [id]);

  const goBackToList = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {filmDetails ? (
        <>
          <div className={styles.card}>
            {filmDetails.poster ? (
              <img className={styles.img} src={filmDetails.poster.url} />
            ) : (
              <img
                className={styles.img}
                src="https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-logo/placeholder.svg"
              />
            )}
            <div className={styles.content}>
              <div className={styles.top}>
                <span className={styles.title}>{filmDetails.name}</span>
                <span className={styles.rating}>{filmDetails.rating.imdb}</span>
              </div>
              <span className={styles.description}>
                {filmDetails.description}
              </span>
              <span
                className={styles.year}
              >{`Год производства ${filmDetails.year}`}</span>
              <span className={styles.genreList}>
                {filmDetails.genres.map((item) => (
                  <p className={styles.genreItem}>{`${item.name}`}</p>
                ))}
              </span>
            </div>
          </div>
          <button className={styles.goBackButton} onClick={goBackToList}>
            Вернуться к списку фильмов
          </button>
        </>
      ) : (
        <div>Загружаем информацию о фильме</div>
      )}
    </div>
  );
}
export default DetailsOfFilm;
