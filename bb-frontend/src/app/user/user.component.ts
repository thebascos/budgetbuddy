import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { SignUpDTO } from '../dtos/auth.dto';

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
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getUserProfile().subscribe(
      (user) => {
        this.user = user;
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
    // Implement your settings logic here
    console.log('Settings clicked');
  }
}
