import { Injectable } from '@angular/core';
import {AuthenticationService} from "./modules/authentication/services/authentication.service";
import {SocketService} from "./core/modules/socket/services/socket.service";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private authService: AuthenticationService, private socketService: SocketService) { }

  async Initialize() {
    this.socketService.startWebSocket(`${environment.apiBaseUrl}`, {transport: ['websocket']});
    await this.authService.Initialize(
      async () => {
        await this.authenticationSuccess();
      },

      async () => {
        await this.authenticationFailed();
      }
    )
  }


  private async authenticationSuccess() {
    this.socketService.startWebSocket(`${environment.apiBaseUrl}`, {transport: ['websocket']});
    this.socketService.authenticateSocket();
  }

  private async authenticationFailed() {
    this.socketService.endWebSocket();
  }
}
