import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUpDTO } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userProfileSubject = new BehaviorSubject<SignUpDTO | undefined>(
    undefined
  );

  constructor(private authrService: AuthService) {
    this.authrService.getUserProfile().subscribe((user) => {
      this.userProfileSubject.next(user);
    });
  }

  getUserProfile(): Observable<SignUpDTO | undefined> {
    return this.userProfileSubject.asObservable();
  }

  setUserProfile(userProfile: SignUpDTO): void {
    this.userProfileSubject.next(userProfile);
  }
}
