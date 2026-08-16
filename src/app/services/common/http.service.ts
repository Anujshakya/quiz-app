import { inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUrlConfig } from '../../app-url.config';
import { QUIZ_API_CONSTANTS } from '../../shared/api-keys/quiz-api';
import { ApiListResultModel, ApiResultModel } from '../../models/common/api-response.model';

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

  public getByUuid(uuid: string): Observable<ApiResultModel<RES>> {
    return this.httpClient.get<ApiResultModel<RES>>(this.createUrlWithUuid(uuid), {
      headers: this.headers,
    });
  }

  public getAllByUuid(uuid: string): Observable<ApiListResultModel<RES>> {
    return this.httpClient.get<ApiListResultModel<RES>>(this.createUrlWithUuid(uuid), {
      headers: this.headers,
    });
  }

  public getAll(...options: Record<string, unknown>[]): Observable<ApiListResultModel<RES>> {
    const params = this.getHttpParams(...options);
    return this.httpClient.get<ApiListResultModel<RES>>(this.url, { headers: this.headers, params });
  }

  public post(body: REQ = {} as REQ): Observable<ApiResultModel<RES>> {
    return this.httpClient.post<ApiResultModel<RES>>(this.url, { ...body }, { headers: this.headers });
  }

  public put(uuid: string, body: REQ = {} as REQ): Observable<ApiResultModel<RES>> {
    return this.httpClient.put<ApiResultModel<RES>>(this.createUrlWithUuid(uuid), { ...body }, {
      headers: this.headers,
    });
  }

  public patch(uuid: string, body: Partial<REQ> = {}): Observable<ApiResultModel<RES>> {
    return this.httpClient.patch<ApiResultModel<RES>>(this.createUrlWithUuid(uuid), { ...body }, {
      headers: this.headers,
    });
  }

  public delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(this.createUrlWithUuid(uuid), {
      headers: this.headers,
    });
  }
}
