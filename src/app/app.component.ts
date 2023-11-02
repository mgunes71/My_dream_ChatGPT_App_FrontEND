import { Component } from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my_dream_frontend';
  loading = true;

  constructor(private appService:AppService) {
    this.appService.Initialize().finally(() => {
      setTimeout(() => {
        this.loading = false;

      }, 1000);
    });
  }
}
