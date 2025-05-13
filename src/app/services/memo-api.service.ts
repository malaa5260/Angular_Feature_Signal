import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

export function createMemoizedFetcher(http: HttpClient) {
  const cache = new Map<string, any>();

  return function fetchWithParams(
    url: string,
    paramsObj: { [key: string]: any },
    forceRefresh: boolean = false
  ): Observable<any> {
    let httpParams = new HttpParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value != null) {
        httpParams = httpParams.set(key, value);
      }
    });

    const sortedKeys = Object.keys(paramsObj).sort();
    const paramsString = sortedKeys.map(key => `${key}=${paramsObj[key]}`).join('&');
    const cacheKey = `${url}?${paramsString}`;

    if (!forceRefresh && cache.has(cacheKey)) {
      console.log('📦 From closure cache:', cacheKey);
      return of(cache.get(cacheKey));
    }

    console.log('🌐 API Call:', cacheKey);
    return http.get(url, { params: httpParams }).pipe(
      tap(response => cache.set(cacheKey, response))
    );
  };
}
