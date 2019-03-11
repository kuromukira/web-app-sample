import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Flex Layout
import { FlexLayoutModule, BREAKPOINT } from '@angular/flex-layout';
const PRINT_BREAKPOINTS = [{
  alias: 'xs.print',
  suffix: 'XsPrint',
  mediaQuery: 'print and (max-width: 297px)',
  overlapping: false
}];

// Angular Material Components
import {
  MatTableModule, MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule,
  MatCardModule, MatDialogModule, MatToolbarModule, MatProgressBarModule, MatSnackBarModule
} from '@angular/material';

// Components
import { AppRoutingModule } from './app-routing.module';
import { RootAppComponent } from './app.component';

// Helpers
import {
  ErrorInterceptor,
  JwtInterceptor
} from './helpers/_index.helper';

// Services
import {
  AuthService,
  LocalStorageService
} from './services/_index.service';

@NgModule({
  declarations: [
    RootAppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'collatask-firebase-config'),
    AppRoutingModule,
    FormsModule,
    MatTableModule, MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule,
    MatCardModule, MatDialogModule, MatToolbarModule, MatProgressBarModule, MatSnackBarModule,
    HttpClientModule,
    FlexLayoutModule.withConfig({ useColumnBasisZero: false })
  ],
  providers: [
    AuthService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: BREAKPOINT, useValue: PRINT_BREAKPOINTS, multi: true }
  ],
  bootstrap: [RootAppComponent]
})
export class AppModule { }
