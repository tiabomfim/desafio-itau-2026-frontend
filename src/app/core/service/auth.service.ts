import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string | null;
  senha: string | null;
}

export interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'access_token';

  readonly autenticado = signal<boolean>(this.possuiToken());

  login(request: LoginRequest) {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.autenticado.set(true);
        })
      );
  }
  
  register(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.autenticado.set(false);
    this.router.navigate(['/login']);
  }

  obterToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  estaAutenticado(): boolean {
    return this.possuiToken();
  }

  private possuiToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}