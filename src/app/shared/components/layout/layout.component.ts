import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../../core/components/base.component";
import {SocketService} from "../../../core/modules/socket/services/socket.service";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../modules/ui-kit/alert/alert.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  extends BaseComponent{

  constructor(private socketService: SocketService, private userService: UserService, private alertService: AlertService) {
    super();
  }

  override async ngOnInit() {
    const user = this.userService.user.getValue();
    this.socketService.listen(`${user.email}`, (dream: any) => {
      console.log(dream);
      this.alertService.successAlert({title: 'success', message: `Your ${dream} dream has been interpreted`});
    });
  }

}
