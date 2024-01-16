import {User} from "./User";

export interface Task {
  id?: number;
  userId: number;
  text: String;
  status: number;
  user?: User;
}
