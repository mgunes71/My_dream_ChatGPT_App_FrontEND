import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {BaseComponent} from "../../../core/components/base.component";
import {takeUntil} from "rxjs";
import {AuthenticationService} from "../../../modules/authentication/services/authentication.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent{
  user: any;

  constructor(private userService: UserService, private authService: AuthenticationService) {
    super();
  }

  override async ngOnInit() {
    this.userService.user.pipe(takeUntil(this.$onDestroy)).subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    this.authService.endSession();
  }
}

