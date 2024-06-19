import React, { ChangeEvent } from "react";
import { SelectYearProps } from "./types";

function SelectYear({ onYearChange }: SelectYearProps): JSX.Element {
  return (
    <select
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onYearChange(e.target.value)
      }
    >
      <option value="">Выберите год</option>
      <option value="all">Все годы</option>
      <option value="2024">2024</option>
      <option value="2023">2023</option>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2010-2019">2010-2019</option>
      <option value="2000-2009">2000-2009</option>
      <option value="1990-1999">1990-1999</option>
    </select>
  );
}

export default SelectYear;
