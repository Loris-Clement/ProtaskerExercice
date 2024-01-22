import {User} from "./User";

export interface Task {
  id?: number;
  userId: number;
  text: string;
  status: number;
  user?: User;
}
