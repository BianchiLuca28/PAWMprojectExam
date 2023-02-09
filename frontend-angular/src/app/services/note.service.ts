import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddNote } from '../models/addNote.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private httpClient: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${environment.baseUrl}/notes`);
  }

  getNote(noteId: string): Observable<Note> {
    return this.httpClient.get<Note>(`${environment.baseUrl}/notes/${noteId}`);
  }

  addNote(note: AddNote): Observable<Note> {
    return this.httpClient.post<Note>(
      `${environment.baseUrl}/notes`,
      note,
      httpOptions
    );
  }

  deleteNote(noteId: string): Observable<Note> {
    return this.httpClient.delete<Note>(
      `${environment.baseUrl}/notes/${noteId}`
    );
  }

  updateNote(noteId: string, note: AddNote): Observable<Note> {
    return this.httpClient.put<Note>(
      `${environment.baseUrl}/notes/${noteId}`,
      note,
      httpOptions
    );
  }
}
