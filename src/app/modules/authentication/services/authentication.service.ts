import {Injectable} from '@angular/core';
import {AuthenticationApi} from "../api/authentication.api";
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticate = false;

  private async afterAuthenticationSuccess(): Promise<void> {
  }

  private async afterAuthenticationFailed(): Promise<void> {
  }

  constructor(
    private api: AuthenticationApi,
    private userService: UserService,
    private router: Router
  ) {
  }

  getApi(): AuthenticationApi {
    return this.api;
  }

  async Initialize(
    success = async () => {
    },
    error = async () => {
    }) {
    this.afterAuthenticationSuccess = success;
    this.afterAuthenticationFailed = error;

    const session = await this.getSession();

    if (!session) {
      await this.afterAuthenticationFailed();
      throw new Error();
    }

    await this.afterAuthenticationSuccess();

    setInterval(async () => {
      await this.getSession();
    }, 1000 * 60 * 2);
  }

  async getSession() {

    if (!localStorage.getItem('token')) return false;

    await this.getApi().getSession().then(res => {
      this.userService.setUser(res);
      this.isAuthenticate = true;

    }).catch(e => {
      this.endSession();
    });

    return this.isAuthenticate;
  }

  endSession() {
    this.afterAuthenticationFailed();
    localStorage.removeItem('token');
    this.userService.setUser(null);
    this.isAuthenticate = false;

    this.router.navigate(['authentication' ,'sign-in']);
  }

  async authenticate(tokenDto: any) {
    localStorage.setItem('token', tokenDto.token);
    await this.getSession();

    await this.afterAuthenticationSuccess();

    await this.router.navigate(['/']);
  }
}
