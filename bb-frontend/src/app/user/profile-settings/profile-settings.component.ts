import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignUpDTO } from 'src/app/dtos/auth.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent {
  errorMessage?: string;

  user: SignUpDTO = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private dialogRef: MatDialogRef<ProfileSettingsComponent>
  ) {}

  ngOnInit(): void {
    this.authService?.getUserProfile().subscribe(
      (user) => {
        this.user = user || {
          name: '',
          email: '',
          password: '',
        };
      },
      (error) => {
        this.router.navigate(['/']);
      }
    );
  }

  onSubmit(): void {
    const updatedUser: SignUpDTO = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
    };

    this.authService.editUser$(updatedUser).subscribe(
      (response) => {
        this.authService.getUserProfile().subscribe((user) => {
          this.sharedService.setUserProfile(user);
          this.dialogRef.close();
        });
      },
      (errorResponse) => {
        this.errorMessage = errorResponse.error.message;
      }
    );
  }
}
