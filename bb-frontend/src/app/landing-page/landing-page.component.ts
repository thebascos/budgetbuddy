import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  public constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          '729116398527-a8vd2gvmp0fi1srm2julko51psshdob2.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signup',
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('buttonDiv'),
        {
          theme: 'filled_black',
          size: 'large',
          text: 'signup_with',
          logo_alignment: 'left',
        }
        // data-theme="filled_black"
        // data-text="signup_with"
        // data-size="large"
        // data-logo_alignment="left">
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.authService.gmailSignUp$(response).subscribe(
      (token) => {
        console.log(token);
        localStorage.setItem('token', token);
        this._ngZone.run(() => {
          this.router.navigate(['/home']);
        });
      },
      (errorResponse) => {}
    );
  }
}
