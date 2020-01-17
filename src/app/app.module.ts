import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { PollComponent } from './poll/poll.component';
import { AdminComponent } from './admin/admin.component';
import { ResultComponent } from './result/result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { InItService } from './in-it.service';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PollListComponent } from './poll/poll-list/poll-list.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AdminDataComponent } from './admin-data/admin-data.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
// import { AuthResolveService } from './user/auth-resolve.service';
export function tokenGetter() {
  // return localStorage.getItem("access_token");
  return 'top_scret';
}
export function appinFunc(init: InItService) {
  return (): Promise<any> => {
    return init.inits();
  };
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PollComponent,
    AdminComponent,
    ResultComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    PollListComponent,
    AdminDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        whitelistedDomains: ['localhost:4200']
      }
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  { provide: APP_INITIALIZER, useFactory: appinFunc, deps: [InItService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
