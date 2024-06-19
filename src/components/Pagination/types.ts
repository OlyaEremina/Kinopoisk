export type PaginationProps = {
  totalPages: number;
  handlePagination: (pageNumber: number) => void;
  currentPage: number;
}
