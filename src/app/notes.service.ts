import { Injectable } from '@angular/core';
import { Note} from './note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }
    public  setNotes(id: string, data: object): void {
        localStorage.setItem('note_' + id, JSON.stringify(data));
    }
    public  getNotes(id: string ): Array<Note> {
        return JSON.parse(localStorage.getItem('note_' + id));
    }
}
