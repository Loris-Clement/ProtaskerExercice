import {Component, OnInit} from '@angular/core';
import {PanelModule} from "primeng/panel";
import { Task } from '../../models/Task';
import {ButtonModule} from "primeng/button";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  tasksList: Task[]=[];

  constructor(private tasksService: TasksService) {
  }
  ngOnInit() {
    this.getAllTasks();
  }

  editTask(id: number) {

  }

  getAllTasks() {
    this.tasksService.getAllTask().subscribe({
      next: response => {
        this.tasksList = response;
        console.log("Succès : ", response);
      },
      error: err => {
        console.error("Erreur : ", err);
      }
    })
  }
}
