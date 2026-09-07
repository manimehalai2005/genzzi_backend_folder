export interface ApiError {
  code: string;
  message: string;

  details?: unknown;

  fieldErrors?: Record<string, string[]>;

  stack?: string;
}