import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anuncio } from 'model/anuncio.model';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private http: HttpClient) { }

  public create(anuncio: Anuncio): Observable<Anuncio>{
    return this.http.post<Anuncio>(`${api.url}/announcements`, anuncio)
  }
  public createWithImage(anuncio: any): Observable<Anuncio>{
    return this.http.post<Anuncio>(`${api.url}/announcements`, anuncio)
  }

  public getAll() : Observable<Anuncio[]>{
    return this.http.get<Anuncio[]>(`${api.url}/announcements`)
  }

  public getByStatus():Observable<Anuncio[]>{
    return this.http.get<Anuncio[]>(`${api.url}/announcements/status`)
  }

  public updateStatus(anuncio: any): Observable<Anuncio>{
    return this.http.patch<Anuncio>(`${api.url}/announcements/status/${anuncio}`, anuncio)
  }

  public delete(transacao: Anuncio): Observable<Anuncio> {
    return this.http.delete<Anuncio>(`${api.url}/announcements/${transacao._id}`,);
  }





}
