import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddNote } from 'src/app/models/addNote.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent {
  title: string = '';
  content: string = '';
  returnUrl: string = '';

  constructor(private noteService: NoteService, private router: Router) {}

  onSubmit() {
    if (!this.title || !this.content) {
      alert('Please add missing fields!');
      return;
    }

    const newNote: AddNote = {
      title: this.title,
      content: this.content,
    };

    this.noteService.addNote(newNote).subscribe((note) => {
      this.router.navigate([this.returnUrl]);
    });
  }
}
