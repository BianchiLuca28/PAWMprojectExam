import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent {
  @Input() note: Note | undefined;

  constructor(private router: Router) {}

  onClick() {
    if (this.note) this.router.navigate(['/home/notes', this.note._id]);
  }

  onClickModify() {
    if (this.note) this.router.navigate(['/home/modify-note', this.note._id]);
  }
}
