import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { GmailSignUpDTO, SignUpDTO } from 'src/app/dtos/auth.dto';
import {
  FacebookLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';

declare const gapi: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup;
  errorMessage?: string;
  isLoggedin?: boolean;
  gmailSignUpData!: SignUpDTO;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private _ngZone: NgZone
  ) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const { name, email, password, admin, houseCode } = this.signUpForm.value;

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
            this.router.navigate(['/home']);
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

// ngOnInit(): void {
//   this.socialAuthService.authState.subscribe((user) => {
//     if (user !== null) {
//       this.gmailSignUpData = {
//         name: user.name,
//         email: user.email,
//         password: '123456',
//       };
//       this.authService.signUp$(this.gmailSignUpData).subscribe(
//         (token) => {
//           if (token) {
//             localStorage.setItem('token', token);
//             this.signUpForm.reset();
//             console.log('success sign up');
//             this.router.navigate(['/home']);
//           }
//         },
//         (errorResponse) => {
//           this.errorMessage = errorResponse.error.message;
//           this.signUpForm.reset();
//         }
//       );
//     }
//   });
// }
