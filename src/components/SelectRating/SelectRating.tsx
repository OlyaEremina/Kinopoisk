import React, { ChangeEvent } from "react";
import { SelectRatingProps } from "./types";

function SelectRating({ onRatingChange }: SelectRatingProps): JSX.Element {
  return (
    <select
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onRatingChange(e.target.value)
      }
    >
      <option value="">Рейтинг</option>
      <option value="allRatings">Любой рейтинг</option>
      <option value="9-10">9-10</option>
      <option value="6-8">6-8</option>
      <option value="3-5">3-5</option>
      <option value="0-2">0-2</option>
    </select>
  );
}

export default SelectRating;
