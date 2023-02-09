import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationLog } from '../models/log.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private httpClient: HttpClient) {}

  getLogs(): Observable<ApplicationLog[]> {
    return this.httpClient.get<ApplicationLog[]>(`${environment.baseUrl}/logs`);
  }
}
