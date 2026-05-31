import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly api = '/api';

  constructor(private http: HttpClient) {}

  hello(): Observable<{ mensaje: string }> {
    return this.http.get<{ mensaje: string }>(`${this.api}/hello`);
  }
}
