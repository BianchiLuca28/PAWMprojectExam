import { Component, OnInit } from '@angular/core';
import { NOTES } from 'src/app/mock-notes';
import { Note } from 'src/app/models/note.model';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  cols: number = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];

  constructor() {}

  ngOnInit(): void {
    this.notes = NOTES;
  }
}
