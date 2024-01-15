import {Component, OnInit} from '@angular/core';
import {PanelModule} from "primeng/panel";
import { Task } from '../../models/Task';
import {ButtonModule} from "primeng/button";
import {TasksService} from "../../services/tasks.service";
import {TableModule} from "primeng/table";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddTaskComponent} from "../../components/add-task/add-task.component";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  tasksList: Task[]=[];
  ref: DynamicDialogRef | undefined;

  constructor(private tasksService: TasksService, public dialogService: DialogService) {
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
      },
      error: err => {
        console.error("Erreur : ", err);
      }
    })
  }

  showAdd() {
    this.ref = this.dialogService.open(AddTaskComponent, {
      header: 'Nouvelle tâche',
      data: {ref: this.ref, refreshTasks: this.refreshTasks.bind(this)}
    })
  }

  private refreshTasks(){
    this.tasksService.getAllTask().subscribe({
      next: response=> {
        this.tasksList = response;
      },
      error: err => {
        console.error("Erreur : ",err);
      }
    })
  }
}
