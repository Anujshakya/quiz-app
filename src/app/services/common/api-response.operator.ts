import { map, type OperatorFunction } from 'rxjs';
import {
  ApiError,
  ApiErrorResponseModel,
  ApiListResponseModel,
  ApiListResultModel,
  ApiResponseModel,
  ApiResultModel,
} from '../../models/common/api-response.model';

function throwIfApiError(response: ApiErrorResponseModel): never {
  throw new ApiError(response);
}

export function unwrapApiResponse<T>(): OperatorFunction<ApiResultModel<T>, ApiResponseModel<T>> {
  return map((response) => (response.success ? response : throwIfApiError(response)));
}

export function unwrapApiListResponse<T>(): OperatorFunction<
  ApiListResultModel<T>,
  ApiListResponseModel<T>
> {
  return map((response) => (response.success ? response : throwIfApiError(response)));
}
