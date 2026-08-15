import { Injectable } from '@angular/core';
import appConfig from '../configs/config.json';

export interface AppConfig {
  baseUrl: string;
  apiUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppUrlConfig {
  private readonly config: AppConfig = appConfig;

  get baseUrl(): string {
    return this.config.baseUrl;
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }
}
