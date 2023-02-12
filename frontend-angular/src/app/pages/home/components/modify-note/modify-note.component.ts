import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNote } from 'src/app/models/addNote.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-modify-note',
  templateUrl: './modify-note.component.html',
  styleUrls: ['./modify-note.component.scss'],
})
export class ModifyNoteComponent implements OnInit {
  modifiedNote: AddNote | undefined;
  returnUrl: string = '';
  noteId: string = '';

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const temp = this.route.snapshot.paramMap.get('id');
    if (temp) {
      this.noteId = temp;
      this.noteService.getNote(this.noteId).subscribe((note) => {
        this.modifiedNote = {
          title: note.title,
          content: note.content,
        };
      });
    }
  }

  onSubmit(): void {
    if (
      !this.modifiedNote ||
      !this.modifiedNote.title ||
      !this.modifiedNote.content
    ) {
      alert('Please add missing fields!');
      return;
    }

    this.noteService
      .updateNote(this.noteId, this.modifiedNote)
      .subscribe((note) => {
        this.router.navigate([this.returnUrl]);
      });
  }
}
