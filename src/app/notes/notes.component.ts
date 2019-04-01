import { Component, OnInit, Input} from '@angular/core';
import {Note} from '../note';
import { NotesService} from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() facebookid: string;
  notes: Array<Note> = [];
  constructor( private notesService: NotesService) { }

  ngOnInit() {
    console.log('ids_id' + this.facebookid);
    this.allNotes();
  }
  public addNote(newNote: string): void {
    const note = new Note();
    note.text = newNote;
    note.type = 0;
    this.notes.push(note);
    this.notesService.setNotes(this.facebookid, this.notes);
  }
  public deleteElement(noteId: number): void {
    const newNotes = Array<Note>();
    for (let i = 0; i < this.notes.length; i++) {
      if ( i !== noteId) {
        newNotes.push(this.notes[i]);
      }
    }
    this.notes = newNotes;
    this.notesService.setNotes(this.facebookid, this.notes);
  }
  public filterNotes(noteType: number): void {
    const newNotes = Array<Note>();
    this.allNotes();
      if (noteType === -1) {
          this.allNotes();
      } else {
        for (let i = 0; i < this.notes.length; i++) {
              if (this.notes[i].type === noteType) {
                newNotes.push(this.notes[i]);
              }
          }
          this.notes = newNotes;
        }
  }
  public setDone(noteId: number, checkboxState: boolean): void {
    console.log(checkboxState);
      for (let i = 0; i < this.notes.length; i++) {
          if ( i === noteId) {
            switch (checkboxState) {
                case true:
                    this.notes[i].type = 1;
                    console.log('true');
                  break;
                case false:
                    this.notes[i].type = 0;
                  break;
                default:
                  break;
            }

          }
      }
      console.log('changed_type');
      this.notesService.setNotes(this.facebookid, this.notes);
  }
  public changeElement(noteId: number, text: string): void {
    console.log(text);
      for (let i = 0; i < this.notes.length; i++) {
          if ( i === noteId) {
            this.notes[i].text = text;
          }
      }
      this.notesService.setNotes(this.facebookid, this.notes);
      console.log('changed_name');
  }
  public allNotes(): void {
    this.notes = this.notesService.getNotes(this.facebookid);
    if (!this.notes) {
      this.notes = [];
    }

  }

}
