import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss'],
})
export class ViewNoteComponent implements OnInit {
  note: Note | undefined;
  returnUrl: string = '';

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    console.log(noteId);
    if (noteId)
      this.noteService.getNote(noteId).subscribe((note) => (this.note = note));
  }

  onModify(): void {
    if (this.note) this.router.navigate(['/home/modify-note', this.note._id]);
  }

  onDelete(): void {
    if (this.note) {
      this.noteService.deleteNote(this.note._id).subscribe((note) => {
        alert('Nota eliminata correttamente');
        this.router.navigate([this.returnUrl]);
      });
    }
  }
}
