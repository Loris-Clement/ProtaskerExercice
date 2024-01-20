import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Task} from "../../models/Task";
import {TasksService} from "../../services/tasks.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent implements OnInit{
  taskID!: number;

  constructor(private taskService: TasksService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
  }

  ngOnInit() {
    this.taskID = this.config.data.id;
  }

  cancel() {
    this.ref.close();
    this.updateTasksList();
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskID).subscribe({
      next: response =>{
        console.log("Succes : ", response);
        this.ref.close();
        this.updateTasksList();
      }
    })
  }

  private updateTasksList() {
    const refreshTasks = this.config?.data.refreshTasks;
    if (refreshTasks){
      refreshTasks();
    }
  }
}
