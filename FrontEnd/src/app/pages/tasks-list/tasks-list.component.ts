import {Component, OnInit} from '@angular/core';
import {PanelModule} from "primeng/panel";
import {Task} from '../../models/Task';
import {ButtonModule} from "primeng/button";
import {TasksService} from "../../services/tasks.service";
import {TableModule} from "primeng/table";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddTaskComponent} from "../../components/add-task/add-task.component";
import {EditTaskComponent} from "../../components/edit-task/edit-task.component";
import {TagModule} from "primeng/tag";
import {DeleteTaskComponent} from "../../components/delete-task/delete-task.component";
import {ToolbarModule} from "primeng/toolbar";
import {ChipsModule} from "primeng/chips";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {UserService} from "../../services/user.service";
import {UserGet} from "../../models/UserGet";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {ExcelService} from "../../services/excel.service";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    TableModule,
    TagModule,
    ToolbarModule,
    ChipsModule,
    ConfirmPopupModule,
    FormsModule,
    DropdownModule,
    DialogModule
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  tasksList: Task[]=[];
  filteredTasksList: Task[] = [];
  ref: DynamicDialogRef | undefined;
  userList: UserGet[] = [];
  searchTerm: string = '';
  status =  [
    {id: 0, text: "En Cours"},
    {id: 1, text: "Bloqué"},
    {id: 2, text: "Terminé"}
  ]
  selectedStatus = { id: -1, text: '' };
  selectedUser = {
    id: -1,
    fullName: ""
  }
  displayDialog = false;


  constructor(private tasksService: TasksService, public dialogService: DialogService, private userService: UserService, private excelService: ExcelService) {
  }
  ngOnInit() {
    this.getAllTasks();
    this.getAllUsers();
    console.log(this.tasksList);
    this.filteredTasksList = this.tasksList;
  }

  getAllTasks() {
    this.tasksService.getAllTask().subscribe({
      next: response => {
        for (let index = 0; index<response.length; index++){
          const task = response[index];
          this.tasksList.push(task);
        }
      },
      error: err => {
        console.error("Erreur : ", err);
      }
    })
  }

  getAllUsers() {
     this.userService.getAllUsers().subscribe({
       next: response =>{
         for (let index =  0;  index < response.length; index++){
           const user = response[index];
           const fullName = `${user.firstName} ${user.lastName}`;
           this.userList.push({
             id: user.id,
             fullName: fullName
           });
         }
       },
       error: err => {
         console.error("Erreur : ", err);
       }
     })
  }
  showAdd() {
    this.ref = this.dialogService.open(AddTaskComponent, {
      header: 'Nouvelle tâche',
      data: {ref: this.ref, refreshTasks: this.refreshTasks.bind(this)},
      closable: false,
      width: '20%',
      height: '45%'
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

  showEdit(id : number) {
    this.ref = this.dialogService.open(EditTaskComponent, {
      header: "Modification d'une tâche",
      data: {ref: this.ref, id: id, refreshTasks: this.refreshTasks.bind(this)},
      closable: false,
      width: '20%',
      height: '45%'
    });
  }

  showDelete(id: number) {
    this.ref = this.dialogService.open(DeleteTaskComponent,  {
      data: {ref: this.ref, id: id, refreshTasks: this.refreshTasks.bind(this)},
      closable: false,
      width: '20%',
      height: '45%'
    })
  }

  updateFilteredTasks(): void {
    this.filteredTasksList = this.tasksList.filter((task) => {
      const textMatch =  task.text.toLowerCase().includes(this.searchTerm.toLowerCase());
      const statusMatch = this.selectedStatus.id == -1 ? true : this.selectedStatus.id == task.status;
      const userMatch = this.selectedUser.id == -1 ? true : this.selectedUser.id == task.userId;
      return textMatch && statusMatch && userMatch;
    });
  }

  reset(){
    this.filteredTasksList = this.tasksList;
    this.searchTerm = '';
    this.selectedStatus = { id: -1, text: '' };
    this.selectedUser = {
      id: -1,
      fullName: ""
    }
    this.toggleDialog();
  }

  toggleDialog() {
    this.displayDialog = !this.displayDialog;
  }

  exportExcel(){
    this.excelService.exportTasksToExcel(this.searchTerm, this.selectedStatus.id, this.selectedUser.id).subscribe({
      next: response =>{
        console.log("Succes");
      },
      error:  err => {
        console.error("Erreur :", err);
      }
    })
  }
}
