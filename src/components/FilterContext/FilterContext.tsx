import React, { createContext, useContext, useState } from "react";
import { FilterContextType, FilterProviderProps } from "./types";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters должны быть использованы внутри FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [selectedYearRange, setSelectedYearRange] = useState<string>("");
  const [selectedRatingRange, setSelectedRatingRange] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const value: FilterContextType = {
    selectedYearRange,
    setSelectedYearRange,
    selectedRatingRange,
    setSelectedRatingRange,
    selectedGenres,
    setSelectedGenres,
    currentPage, 
    setCurrentPage,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
