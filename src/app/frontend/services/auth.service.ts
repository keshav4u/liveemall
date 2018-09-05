import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const base_url = 'http://localhost:8080/';
@Injectable()

export class AuthService {

  authToken: any;
  user: any;

  error(msg): any {
    console.log(msg);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  constructor(private http: HttpClient) { }

  registerUser(user): Observable<any> {
    return this.http.post(base_url + 'users/register', user, httpOptions)
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        catchError(this.handleError<any>('', {success: false, msg: "Please check your internet connection or may be it's Internal server error"}))
      );
  }

  login(user): Observable<any> {
    return this.http.post(base_url + 'users/authenticate', user, httpOptions)
      .pipe(
        tap((res) => { }),
        catchError(this.handleError<any>('', {success: false, msg: "Please check your internet connection or may be it's Internal server error"}))
      );
  }
  logout() {
    this.authToken = null;
    this.user = null;
    if(typeof window !== 'undefined'){
      localStorage.clear();
    }
    
  }

  loggedIn() {
    if(typeof window !== 'undefined'){
      if (localStorage.getItem('token') != null){
        return true;
      }else{
        return false;
      }
    }
    
      
  }
  storeUserData(token, user) {
    if(typeof window !== 'undefined'){
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.authToken, 'Content-Type': 'application/json' })
    };
    return this.http.get(base_url + 'users/profile', httpOptions)
      .pipe(
        tap((res) => { })
      );

  }

  loadToken() {
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('token');
      this.authToken = token;
    }
   
  }

  checkEmail(user): Observable<any> {

    return this.http.post(base_url + 'users/checkEmail', user, httpOptions)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  checkPhone(user): Observable<any> {
    return this.http.post(base_url + 'users/checkPhone', user, httpOptions)
      .pipe(
        tap((res) => {
          console.log(res);
        })

      );
  }

  checkUsername(user): Observable<any> {
    return this.http.post(base_url + 'users/checkUsername', user, httpOptions)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );

  }

}
