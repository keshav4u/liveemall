
import { map, take, debounceTime} from 'rxjs/operators';
import { AuthService } from './frontend/services/auth.service';
import { AbstractControl } from '@angular/forms';


export class CustomValidator {


  static email(authService: AuthService, self) {
    return (control: AbstractControl) => {
      var user = {
        email: ""
      }

      user.email = control.value.toLowerCase();
      self.checkEmailShow = true;
      return authService.checkEmail(user)
        .pipe(
          debounceTime(500),
          take(1),
          map(res => {
            self.checkEmailShow = false;
            return res.success ? null : { emailTaken: true };
          })
        )

    }
  }
  static phone(authService: AuthService, self) {
    return (control: AbstractControl) => {
      var user = {
        phone: ""
      }
      self.checkPhoneShow = true;
      user.phone = control.value.toLowerCase();
      return authService.checkPhone(user)
        .pipe(
          debounceTime(500),
          take(1),
          map(res => {
            self.checkPhoneShow = false;
            return res.success ? null : { phoneTaken: true };
          })
        )

    }
  }
  static username(authService: AuthService, self) {
    return (control: AbstractControl) => {
      var user = {
        username: ""
      }
      self.checkUsernameShow = true;
      user.username = control.value.toLowerCase();
      return authService.checkUsername(user)
        .pipe(
          debounceTime(500),
          take(1),
          map(res => {
            self.checkUsernameShow = false;
            return res.success ? null : { usernameTaken: true };
          })
        )

    }
  }

  /***email or phone check***/
  /* static emailMobile(authService: AuthService, self) {
    var phoneRegx = new RegExp("^((\\+91-?)|0)?[0-9]{10}$");
    var emailRegx = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]*$");
    return (control: AbstractControl) => {
      var user = {
        phone: "",
        email: ""
      }
      
      if (phoneRegx.test(control.value)) {
        user.phone = control.value;
        self.checkEmailPhoneShow = true;
        return authService.checkPhone(user)
          .pipe(
            debounceTime(500),
            take(1),
            map(res => {
              self.checkEmailPhoneShow = false;
              return res.success ? null : { phoneTaken: true };
            })
          )
      }

      if (emailRegx.test(control.value)) {
        user.email = control.value.toLowerCase();
        self.checkEmailPhoneShow = true;
        return authService.checkEmail(user)
          .pipe(
            debounceTime(500),
            take(1),
            map(res => {
              self.checkEmailPhoneShow = false;
              return res.success ? null : { emailTaken: true };
            })
          )
      }
    }
  } */
 

}
