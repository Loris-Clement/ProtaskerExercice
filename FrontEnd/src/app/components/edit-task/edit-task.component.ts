import {Component, OnInit} from '@angular/core';
import {UserGet} from "../../models/UserGet";
import {TasksService} from "../../services/tasks.service";
import {UserService} from "../../services/user.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Task} from "../../models/Task";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit{
  usersList: UserGet[] = [];
  status = ["En Cours", "Bloqué", "Terminé"];
  task!: Task;

  constructor(private taskService: TasksService, private userService: UserService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) {

  }

  ngOnInit() {
    this.getAllUsers();
    this.taskService.getTaskById(this.config.data.id).subscribe({
      next: response => {
        this.task = response
        this.taskForm.patchValue({
          textTask: response.text,
          selectedUser: this.usersList.find(user => user.id === response.userId),
          selectedStatus: this.status[response.status]
        })
      }
    });
  }

  taskForm = new FormGroup({
    textTask: new FormControl('',[Validators.required]),
    selectedUser: new FormControl<UserGet | null>(null,[Validators.required]),
    selectedStatus: new FormControl('',[Validators.required])
  })
  updateTask(){
    let statusNumber: number = -1;
    switch (this.taskForm.value.selectedStatus!){
      case "En Cours":
        statusNumber = 0;
        break;

      case "Bloqué":
        statusNumber = 1;
        break;

      case "Terminé":
        statusNumber = 2;
        break;
    }
    this.task.userId  = this.taskForm.value.selectedUser?.id!;
    this.task.text = this.taskForm.value.textTask!;
    this.task.status = statusNumber;
    this.taskService.updateTask(this.task).subscribe({
      next: response => {
        this.ref.close();
        this.updateTasksList();
      },
      error: err => {
        console.error("Erreur : ",err);
      }
    });
  }

  cancel() {
    this.ref.close();
    this.updateTasksList();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: response => {
        for (let index = 0; index < response.length; index++) {
          const user = response[index];
          const fullName = `${user.firstName} ${user.lastName}`;

          //adding data inside the table
          this.usersList.push({
            id: user.id,
            fullName: fullName,
          });
        }
      },
      error: err => {
        console.error("Erreur : ", err);
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
