import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { NotesComponent } from './pages/home/components/notes/notes.component';
import { ViewNoteComponent } from './pages/home/components/view-note/view-note.component';
import { AddNoteComponent } from './pages/home/components/add-note/add-note.component';
import { LogsComponent } from './pages/home/components/logs/logs.component';
import { ModifyNoteComponent } from './pages/home/components/modify-note/modify-note.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        // Considera cambiare la route per passare direttamente la nota
        path: 'notes/:id',
        component: ViewNoteComponent,
      },
      {
        path: 'add-note',
        component: AddNoteComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
      {
        path: 'modify-note/:id',
        component: ModifyNoteComponent,
      },
      {
        path: '',
        component: NotesComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
