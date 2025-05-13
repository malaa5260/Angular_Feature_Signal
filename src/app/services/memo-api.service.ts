import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemoApiService {
  private cache = new Map<string, any>();
  private httpClient = inject(HttpClient);


  fetchWithParams(url: string, paramsObj: { [key: string]: any }): Observable<any> {
    let httpParams = new HttpParams();
    for (let key in paramsObj) {
      if (paramsObj[key] !== undefined && paramsObj[key] !== null) {
        httpParams = httpParams.set(key, paramsObj[key]);
      }
    }
    const sortedKeys = Object.keys(paramsObj).sort();
    const paramsString = sortedKeys.map(key => `${key}=${paramsObj[key]}`).join('&');
    const cacheKey = `${url}?${paramsString}`;
    if (this.cache.has(cacheKey)) {
      return new Observable(observer => {
        observer.next(this.cache.get(cacheKey));
        observer.complete();
      });
    }
    return this.httpClient.get(url, { params: httpParams }).pipe(
      tap(response => {
        this.cache.set(cacheKey, response);
      })
    );
  }
}
