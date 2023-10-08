import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login$({ email, password }).subscribe(
        (token) => {
          if (token) {
            localStorage.setItem('token', token);
            this.loginForm.reset();
            // this.router.navigate(['/home']);
            console.log('sucess');
          }
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.message;
          this.loginForm.reset();
        }
      );
    }
  }
}
