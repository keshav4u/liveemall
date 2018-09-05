import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDialog } from '../main-nave/main-nave.component'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin: FormGroup;
  checkEmailPhoneShow: Boolean = false;
  emailMobileRegexp: string | RegExp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|((\\+91-?)|0)?[0-9]{10}$";
  phoneRegx = new RegExp("^((\\+91-?)|0)?[0-9]{10}$");
  emailRegx = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]*$");
  checkLoginSpinnerShow: Boolean = false;
  hide: Boolean = false;
  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loginDialog: LoginDialog
  ) { }


  ngOnInit() {
    this.createFormControls();

  }

  createFormControls() {
    this.userLogin = this.fb.group({
      emailMobile: [''
    ],
      password: ['']
    });
  }

  get emailMobile() {
    return this.userLogin.get('emailMobile');
  }
  get password() {
    return this.userLogin.get('password');
  }
  openTost(err) {
    this.snackBar.open(err, 'Cancel', {
      duration: 5000,
      panelClass: 'registerError',
    });
  }
  onLogin() {
    if (!this.userLogin.invalid) {
      this.checkLoginSpinnerShow = true;
      let emailMobileModel = this.userLogin.get('emailMobile').value;
      if (this.phoneRegx.test(emailMobileModel)) {
        this.userLogin.value.phone = emailMobileModel.trim();
        this.userLogin.value.email = '';
        this.authService.login(this.userLogin.value).subscribe(data => {
          if (data.success) {
            this.checkLoginSpinnerShow = false;
            this.authService.storeUserData(data.token, data.user);
            this.loginDialog.dialogRef.close();
          }
          else {
            this.checkLoginSpinnerShow = false;
            this.openTost(data.msg);
          }
        });
      }

      if (this.emailRegx.test(emailMobileModel)) {
        this.userLogin.value.email = emailMobileModel.trim();
        this.userLogin.value.phone = '';
        this.authService.login(this.userLogin.value).subscribe(data => {

          if (data.success) {
            this.checkLoginSpinnerShow = false;
            this.authService.storeUserData(data.token, data.user);
            this.router.navigate(['.']);
          }
          else {
            this.snackBar.open(data.msg, 'Cancel', {
              duration: 5000,
              panelClass: 'registerError',
            });
            this.checkLoginSpinnerShow = false;

          }
        })
      }

    }
  }




}



