import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LogInDTO, SignUpDTO } from '../dtos/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsSignedIn: boolean = false;
  url = 'http://localhost:3000';
  constructor(readonly HttPClient: HttpClient) {}

  public signUp$(signUpDTO: SignUpDTO) {
    return this.HttPClient.post<{ access_token: string }>(
      `${this.url}/auth/signup`,
      signUpDTO
    ).pipe(
      map((response) => {
        return response.access_token;
      })
    );
  }
  public login$(loginDTO: LogInDTO) {
    return this.HttPClient.post<{ access_token: string }>(
      `${this.url}/auth/login`,
      loginDTO
    ).pipe(
      map((response) => {
        return response.access_token;
      })
    );
  }
}
