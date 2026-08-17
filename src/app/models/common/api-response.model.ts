/** Pagination metadata returned alongside list responses. */
export interface ApiResponseMetaModel {
  limit: number;
  total: number;
  offset: number;
}

/** Base shape shared by all API responses. */
interface ApiResponseBaseModel {
  success: boolean;
}

/** Single-resource API response, e.g. GET /users/:id */
export interface ApiResponseModel<T> extends ApiResponseBaseModel {
  success: true;
  data: T;
}

/** List/collection API response, e.g. GET /users */
export interface ApiListResponseModel<T> extends ApiResponseBaseModel {
  success: true;
  data: T[];
  meta: ApiResponseMetaModel;
}

/** Standard error response shape. */
export interface ApiErrorResponseModel extends ApiResponseBaseModel {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/** Use when a request could fail — enables compile-time narrowing on `success`. */
export type ApiResultModel<T> = ApiResponseModel<T> | ApiErrorResponseModel;
export type ApiListResultModel<T> = ApiListResponseModel<T> | ApiErrorResponseModel;

/** Thrown when the API returns `{ success: false }` so subscribers can use the `error` callback. */
export class ApiError extends Error {
  constructor(public readonly response: ApiErrorResponseModel) {
    super(response.error.message);
    this.name = 'ApiError';
  }
}
