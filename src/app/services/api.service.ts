import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleRule } from '../models/schedule.model';

export interface SaveScheduleRequest {
  rules: ScheduleRule[];
  timestamp: string;
  userId?: string;
}

export interface SaveScheduleResponse {
  success: boolean;
  message: string;
  savedId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // URL de l'API fictive - à remplacer par votre vraie API
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';
  
  constructor(private http: HttpClient) {}

  /**
   * Sauvegarde les règles d'horaires vers l'API
   * @param rules Les règles à sauvegarder
   * @param userId Identifiant de l'utilisateur (optionnel)
   * @returns Observable de la réponse de l'API
   */
  saveScheduleRules(rules: ScheduleRule[], userId?: string): Observable<any> {
    const payload: SaveScheduleRequest = {
      rules: rules,
      timestamp: new Date().toISOString(),
      userId: userId
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Pour une vraie API, vous pourriez ajouter un token d'authentification :
    // headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post<SaveScheduleResponse>(this.API_URL, payload, { headers });
  }

  /**
   * Récupère les règles sauvegardées depuis l'API
   * @param userId Identifiant de l'utilisateur
   * @returns Observable des règles sauvegardées
   */
  loadScheduleRules(userId?: string): Observable<any> {
    const url = userId 
      ? `${this.API_URL}?userId=${userId}`
      : this.API_URL;
    
    return this.http.get<any>(url);
  }
}
