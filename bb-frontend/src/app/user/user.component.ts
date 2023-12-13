import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { SignUpDTO } from '../dtos/auth.dto';
import { MatDialog } from '@angular/material/dialog';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user?: SignUpDTO;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserProfile().subscribe(
      (user) => {
        this.user = user;
        console.log(user);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        this.router.navigate(['/']);
      }
    );
  }

  logOut() {
    this.authService.logoutUser$().subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }

  openSettings() {
    const dialogRef = this.dialog.open(ProfileSettingsComponent, {
      // width: '400px',
    });
  }
}
