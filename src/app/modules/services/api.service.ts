import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiLoginResponse } from '../models/apiLoginResponse.interface';
import { ApiProfileResponse } from '../models/apiProfileResponse.interface';
import { ApiMarketResponse } from '../models/apiMarketResponse.interface';
import { ApiBalanceResponse } from '../models/apiBalanceResponse.interface';
import { ApiOpenOrderResponse } from '../models/apiOpenOrderResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiLoginUrl = 'https://akademi-cp.bitlo.com/api/interview/auth/login';
  private apiProfileUrl = 'https://akademi-cp.bitlo.com/api/interview/auth/me';
  private apiMarketUrl = 'https://akademi-cp.bitlo.com/api/interview/markets';
  private apiBalanceUrl = 'https://akademi-cp.bitlo.com/api/interview/auth/balances';
  private apiOpenOrderUrl = 'https://akademi-cp.bitlo.com/api/interview/auth/open-orders';
  constructor(private http: HttpClient) { }

 
  login(email: string, password: string): Observable<ApiLoginResponse> {
    const body = { identifier: email, password: password };
    return this.http.post<ApiLoginResponse>(this.apiLoginUrl, body);
  }
  
  getToken() {
    return localStorage.getItem('token')|| '';
  }

  getMarkets(): Observable<ApiMarketResponse[]> {
    return this.http.get<ApiMarketResponse[]>(this.apiMarketUrl);
  }

  getProfile(): Observable<ApiProfileResponse[]> {
    const headers = new HttpHeaders().set('x-bitlo-auth', this.getToken());
    return this.http.post<ApiProfileResponse[]>(this.apiProfileUrl, {}, { headers });
  }
  
  getBalances(): Observable<ApiBalanceResponse[]> {
    const headers = new HttpHeaders().set('x-bitlo-auth', this.getToken());
    return this.http.post<ApiBalanceResponse[]>(this.apiBalanceUrl, {}, { headers });
  }
  
  getOpenOrders(): Observable<ApiOpenOrderResponse[]> {
    const headers = new HttpHeaders().set('x-bitlo-auth', this.getToken());
    return this.http.post<ApiOpenOrderResponse[]>(this.apiOpenOrderUrl, {}, { headers });
  }
  
  logout(): Observable<ApiLoginResponse> {
    return new Observable<ApiLoginResponse>((observer) => {
      observer.next({ code: 200, message: 'Çıkış yapıldı.' });
      observer.complete();
    });
  }
}
