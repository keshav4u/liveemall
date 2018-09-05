import { Component, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatIconRegistry } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-main-nave',
  templateUrl: './main-nave.component.html',
  styleUrls: ['./main-nave.component.scss']
})
export class MainNaveComponent implements OnInit, AfterViewInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['.']);
    return false;
  }
  ngOnInit() { }

  ngAfterViewInit() {
    setTimeout(() => {
       if (!localStorage.getItem('islogPopupShown')) {
         localStorage.setItem('islogPopupShown', '1');
         this.openLoginDialog();
       }
       else {
         if (localStorage.getItem('islogPopupShown') == '1' && !this.authService.loggedIn()) {
           this.openLoginDialog();
         }
       }
      
    }, 500);
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialog,{
      panelClass:"logNdRegDilog"
    })
      .afterClosed().subscribe(() => {
        localStorage.setItem('islogPopupShown', '2');
        console.log('The dialog was closed');
      });
  }

}

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.scss']
})

export class LoginDialog {
  loginShow:Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  toggalLogNdReg(){
    this.loginShow = !this.loginShow;
  }
}
