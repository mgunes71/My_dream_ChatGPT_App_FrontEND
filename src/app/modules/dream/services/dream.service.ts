import {Injectable} from "@angular/core";
import {DreamApi} from "../api/dream.api";
import {BehaviorSubject} from "rxjs";
import {SocketService} from "../../../core/modules/socket/services/socket.service";
import {UserService} from "../../../shared/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class DreamService {
  constructor(private dreamApi: DreamApi, private socketService: SocketService, private userService: UserService) {
    const user = this.userService.user.getValue();
    this.socketService.listen(`${user.email}`, () => {
      this.getUserDreams();
    });
  }

  dreams = new BehaviorSubject<any>([]);

  getApi() {
    return this.dreamApi;
  }

  async getUserDreams() {
    await this.getApi().getUserDreams().then(res => {
      this.dreams.next(res);
      return true;
    }).catch(e => {
      return false;
    });
  }
}
