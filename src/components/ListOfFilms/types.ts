export type Genre = {
  name: string;
}

export type Film = {
  description: string;
  genres: Genre[];
  id: number;
  name: string;
  poster: {
    url: string;
    previewUrl: string;
  };
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  year: number;
}

export type FilmId = Film['id']