import { IUser } from "./User";

declare global {
  namespace Express {
    interface User extends IUser {}
    // interface Request {
    //   user?: User | undefined;
    // }
  }
}
