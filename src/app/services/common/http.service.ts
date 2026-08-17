import { inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUrlConfig } from '../../app-url.config';
import { QUIZ_API_CONSTANTS } from '../../shared/api-keys/quiz-api';
import {
  ApiListResponseModel,
  ApiListResultModel,
  ApiResponseModel,
  ApiResultModel,
} from '../../models/common/api-response.model';
import { unwrapApiListResponse, unwrapApiResponse } from './api-response.operator';

export abstract class HttpService<REQ, RES> {
  protected httpClient = inject(HttpClient);
  protected config = inject(AppUrlConfig);
  protected headers = new HttpHeaders({
    Authorization: `Bearer ${QUIZ_API_CONSTANTS.key}`,
    'Content-Type': 'application/json',
  });

  protected abstract getResourceUrl(): string;

  protected get url(): string {
    return `${this.config.apiUrl}${this.getResourceUrl()}`;
  }

  protected createUrlWithUuid(uuid: string): string {
    return `${this.url}/${uuid}`;
  }

  public getHttpParams(...params: Record<string, unknown>[]): HttpParams {
    const paramsObject = Object.assign({}, ...params);
    let httpParams = new HttpParams();

    for (const prop in paramsObject) {
      if (!Object.prototype.hasOwnProperty.call(paramsObject, prop)) {
        continue;
      }

      const paramValue = paramsObject[prop];
      if (paramValue != null && paramValue !== '') {
        httpParams = httpParams.append(prop, String(paramValue));
      }
    }

    return httpParams;
  }

  public getByUuid(uuid: string): Observable<ApiResponseModel<RES>> {
    return this.httpClient
      .get<ApiResultModel<RES>>(this.createUrlWithUuid(uuid), { headers: this.headers })
      .pipe(unwrapApiResponse<RES>());
  }

  public getAllByUuid(uuid: string): Observable<ApiListResponseModel<RES>> {
    return this.httpClient
      .get<ApiListResultModel<RES>>(this.createUrlWithUuid(uuid), { headers: this.headers })
      .pipe(unwrapApiListResponse<RES>());
  }

  public getAll(...options: Record<string, unknown>[]): Observable<ApiListResponseModel<RES>> {
    const params = this.getHttpParams(...options);
    return this.httpClient
      .get<ApiListResultModel<RES>>(this.url, { headers: this.headers, params })
      .pipe(unwrapApiListResponse<RES>());
  }

  public post(body: REQ = {} as REQ): Observable<ApiResponseModel<RES>> {
    return this.httpClient
      .post<ApiResultModel<RES>>(this.url, { ...body }, { headers: this.headers })
      .pipe(unwrapApiResponse<RES>());
  }

  public put(uuid: string, body: REQ = {} as REQ): Observable<ApiResponseModel<RES>> {
    return this.httpClient
      .put<ApiResultModel<RES>>(this.createUrlWithUuid(uuid), { ...body }, { headers: this.headers })
      .pipe(unwrapApiResponse<RES>());
  }

  public patch(uuid: string, body: Partial<REQ> = {}): Observable<ApiResponseModel<RES>> {
    return this.httpClient
      .patch<ApiResultModel<RES>>(this.createUrlWithUuid(uuid), { ...body }, { headers: this.headers })
      .pipe(unwrapApiResponse<RES>());
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(this.createUrlWithUuid(uuid), {
      headers: this.headers,
    });
  }
}
