
/* dependencies */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';


/* modules */
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

/* custom modules */
import { AppRoutingModule } from './/app-routing.module';
import { MaterialModule } from './/material.module';


/* services */
import { AuthService } from './frontend/services/auth.service';
import { AuthGuardService } from './frontend/guard/auth-guard.service';
import { AuthGuard2Service } from './frontend/guard/auth-guard2.service';

/*****main component******/
import { AppComponent } from './app.component';

/*****all components******/
import { LoginComponent } from './frontend/components/login/login.component';
import { MainNaveComponent, LoginDialog} from './frontend/components/main-nave/main-nave.component';
import { RegisterComponent } from './frontend/components/register/register.component';
import { ProfileComponent } from './frontend/components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MainNaveComponent,
    LoginDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'liveemall' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule    
  ],
  entryComponents:[LoginDialog],
  providers: [
    AuthGuardService,
    AuthService,
    AuthGuard2Service
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}

