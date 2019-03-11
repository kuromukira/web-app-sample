import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatTableModule, MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule, MatTabsModule,
  MatCardModule, MatDialogModule, MatToolbarModule, MatProgressBarModule, MatSnackBarModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher,
  MatFormFieldModule
} from '@angular/material';

// Components
import { AppRoutingModule } from './app-routing.module';
import { RootAppComponent } from './app.component';
import {
  LoginComponent,
  HomeComponent
} from './components/_index.component';

// Helpers
import {
  ErrorInterceptor,
  JwtInterceptor
} from './helpers/_index.helper';

// Services
import {
  AuthService,
  LocalStorageService,
  TodoService
} from './services/_index.service';

@NgModule({
  declarations: [
    RootAppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'collatask-firebase-config'),
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatTableModule, MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule,
    MatCardModule, MatDialogModule, MatToolbarModule, MatProgressBarModule, MatSnackBarModule, MatTabsModule, MatFormFieldModule,
    HttpClientModule,
    FlexLayoutModule.withConfig({ useColumnBasisZero: false })
  ],
  providers: [
    AuthService,
    LocalStorageService,
    TodoService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: BREAKPOINT, useValue: PRINT_BREAKPOINTS, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [RootAppComponent]
})
export class AppModule { }
