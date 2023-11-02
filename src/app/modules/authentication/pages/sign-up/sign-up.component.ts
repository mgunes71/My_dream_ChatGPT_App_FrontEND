import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  loading = false;
  showReferral = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        // Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
      ],
    ],
    confirmPassword: ['', [Validators.required]],
  }, {validators: this.passwordMatchValidator});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  async signUp() {
    this.loading = true;
    const formValues = this.form.value;
    delete formValues.confirmPassword;

    await this.authService.getApi().register(formValues).then(async token => {
      await this.authService.authenticate(token).finally(() => {
        this.loading = false;
      });
    }).catch(e => {
      this.loading = false;
      return;
    });
  }

  passwordMatchValidator(control: FormGroup) {
    const password = control.controls['password'];
    const confirmPassword = control.controls['confirmPassword'];

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({passwordMatch: true});
    } else {
      confirmPassword?.setErrors(null);
    }
  }
}
