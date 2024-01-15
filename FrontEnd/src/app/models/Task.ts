import {User} from "./User";

export interface Task {
  id: number;
  idUser: number;
  text: String;
  status: number;
  user: User;
}
