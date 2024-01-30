import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { IAuthData } from '../interfaces/iauth-data';
import { IUser } from '../interfaces/iuser';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  autSubject = new BehaviorSubject<IAuthData | null>(null);

  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserStorage();
  }

  getHeaders() {
    let headers: HttpHeaders = new HttpHeaders()
    .set('Authorization',
    'Bearer ' + this.getJwtToken());
    return headers;
  }

  restoreUserStorage() {
    const json = localStorage.getItem(`${environment.localStorage}`);
    if (json) {
      const user = JSON.parse(json);
      if (this.helper.isTokenExpired(user.token)) {
        this.router.navigate(['/login']);
        return
      } else {
        this.autSubject.next(user);
      }
    }
  }

  login(user: IUser) {
    return this.http.post<IAuthData>(`${environment.apiURL}/api/v1/auth/login`, user).pipe(
      tap((data) => {
        this.autSubject.next(data);
        localStorage.setItem(`${environment.localStorage}`, JSON.stringify(data));
      })
    );
  }

  getUser(username:string) {
    return this.http.get<IUser>(`${environment.apiURL}/api/v1/auth/users/` + username, {'headers': this.getHeaders()});
  }

  signUpUser(user:any) {
    return this.http.post<IAuthData>(`${environment.apiURL}/api/v1/auth/register`, user);
  }

  getJwtToken() {
    const json = localStorage.getItem(`${environment.localStorage}`);
    if (json){
      const user = JSON.parse(json);
      return user.token;
    }
  }

  logout() {
    this.autSubject.next(null);
    localStorage.removeItem(`${environment.localStorage}`);
    localStorage.removeItem("profileImage");
    this.router.navigate(['/login']);
  }
}
