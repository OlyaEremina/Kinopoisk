import { ReactNode } from "react";

export type FilterContextType = {
  selectedYearRange: string;
  setSelectedYearRange: React.Dispatch<React.SetStateAction<string>>;
  selectedRatingRange: string;
  setSelectedRatingRange: React.Dispatch<React.SetStateAction<string>>;
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; 
};

export type FilterProviderProps = {
  children: ReactNode;
};
