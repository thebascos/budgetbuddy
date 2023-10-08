import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup;
  errorMessage?: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      houseCode: [''], // Remove Validators.required for houseCode
      admin: [false],
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const { name, email, password, admin, houseCode } = this.signUpForm.value;
      console.log('Form values:', { name, email, password, admin, houseCode });

      // Check if houseCode is empty, and if so, set it to null
      const signUpData = {
        name,
        email,
        password,
      };

      this.authService.signUp$(signUpData).subscribe(
        (token) => {
          if (token) {
            localStorage.setItem('token', token);
            this.signUpForm.reset();
            console.log('success sign up');
            // this.router.navigate(['/home']);
          }
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.message;
          this.signUpForm.reset();
        }
      );
    }
  }
}
