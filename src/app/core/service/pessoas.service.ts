import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private readonly apiUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) {}

  listar(nome: string | null, page: number, size: number, sortField: string, sortDirection: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortField},${sortDirection}`);

    if (nome && nome.trim() !== '') {
      params = params.set('nome', nome);
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  cadastrar(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  atualizar(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}