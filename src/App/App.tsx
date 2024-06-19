import { Route, Routes } from "react-router-dom";
import ListOfFilms from "../components/ListOfFilms/ListOfFilms";
import DetailsOfFilm from "../components/DetailsOfFilm/DetailsOfFilm";
import { FilterProvider } from "../components/FilterContext/FilterContext";

function App() {
  return (
    <FilterProvider>
      <Routes>
        <Route index element={<ListOfFilms />} />
        <Route path="/film/:id" element={<DetailsOfFilm />} />
      </Routes>
    </FilterProvider>
  );
}

export default App;
