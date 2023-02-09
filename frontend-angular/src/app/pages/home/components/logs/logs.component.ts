import { Component, OnInit } from '@angular/core';
import { ApplicationLog } from 'src/app/models/log.model';
import { LogService } from 'src/app/services/log.service';

const OPERATION_COLOR: { [operation: string]: string } = {
  ADD: '#32CD32',
  DEL: '#DC143C',
  UPDATE: '#FFA500',
};

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  logs: ApplicationLog[] = [];
  displayedColumns: string[] = [
    'noteTitle',
    'noteId',
    'operation',
    'createdOnDate',
  ];

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.getLogs().subscribe((logs) => (this.logs = logs));
  }

  getOperationColor(operation: string): string {
    return OPERATION_COLOR[operation];
  }
}
