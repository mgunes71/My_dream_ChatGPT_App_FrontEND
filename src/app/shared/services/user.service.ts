import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user = new BehaviorSubject<any>(null);

  constructor() {
  }

  setUser(user: any) {
    this.user.next(user);
  }
}
