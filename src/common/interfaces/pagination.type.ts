export class PaginatedResponse<T> {
  items!: T[];
  totalCount!: number;
}

export class Pagination {
  limit = 20;
  page!: number;
  totalCount?: number;
}
