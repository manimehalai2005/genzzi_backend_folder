export interface ApiMeta {
  count?: number;

  page?: number;
  limit?: number;

  total?: number;
  totalPages?: number;

  hasNext?: boolean;
  hasPrevious?: boolean;

  version?: string;
}