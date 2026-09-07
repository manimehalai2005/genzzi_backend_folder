import { ApiMeta } from './api-meta.interface';
import { ApiResponse } from './api-response.interface';

export class ResponseBuilder {
  static success<T>(
    data: T,
    options?: {
      message?: string;
      statusCode?: number;
      meta?: ApiMeta;
      path?: string;
      method?: string;
      requestId?: string;
    },
  ): ApiResponse<T> {
    return {
      success: true,
      statusCode: options?.statusCode ?? 200,
      message: options?.message ?? 'Success',

      data,

      error: null,

      meta: options?.meta ?? {},

      timestamp: new Date().toISOString(),

      path: options?.path ?? '',

      method: options?.method ?? '',

      requestId: options?.requestId ?? '',
    };
  }

  static error(
    options: {
      statusCode: number;
      message: string;
      code: string;

      details?: unknown;

      fieldErrors?: Record<string, string[]>;

      stack?: string;

      path?: string;

      method?: string;

      requestId?: string;
    },
  ): ApiResponse<null> {
    return {
      success: false,

      statusCode: options.statusCode,

      message: options.message,

      data: null,

      error: {
        code: options.code,
        message: options.message,
        details: options.details,
        fieldErrors: options.fieldErrors,
        stack: options.stack,
      },

      meta: {},

      timestamp: new Date().toISOString(),

      path: options.path ?? '',

      method: options.method ?? '',

      requestId: options.requestId ?? '',
    };
  }
}