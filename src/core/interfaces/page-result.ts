export type PageResult<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
};
