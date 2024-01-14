import { Routes } from '@angular/router';
import {TasksListComponent} from "./pages/tasks-list/tasks-list.component";

export const routes: Routes = [
  {path: 'tasks/list', component: TasksListComponent},
  {path: '', component: TasksListComponent},
  {path: '**', component: TasksListComponent}
];
