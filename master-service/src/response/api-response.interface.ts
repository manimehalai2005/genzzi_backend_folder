import { ApiError } from './api-error.interface';
import { ApiMeta } from './api-meta.interface';

export interface ApiResponse<T = unknown> {
  success: boolean;

  statusCode: number;

  message: string;

  data: T | null;

  error: ApiError | null;

  meta: ApiMeta;

  timestamp: string;

  path: string;

  method: string;

  requestId: string;
}