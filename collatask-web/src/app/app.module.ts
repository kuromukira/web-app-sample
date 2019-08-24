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
  MatFormFieldModule, MatMenuModule, MatTooltipModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components
import { AppRoutingModule } from './app-routing.module';
import { RootAppComponent } from './app.component';
import {
  LoginComponent,
  DialogComponent,
  PromptDialogComponent,
  HomeComponent,
  TodoListComponent,
  NavButtonsComponent,
  AddTodoComponent,
  EditTodoComponent,
  SubTodoComponent,
  CalendarComponent,
  CalendarToolbarComponent,
  CalendarDropListComponent
} from './components/_index.component';

// Helpers
import {
  ErrorInterceptor,
  JwtInterceptor
} from './helpers/_index.helper';

// Services
import {
  AuthService,
  CalendarService,
  LocalStorageService,
  TodoService,
  SignalRService
} from './services/_index.service';

@NgModule({
  declarations: [
    RootAppComponent,
    LoginComponent,
    PromptDialogComponent,
    HomeComponent,
    TodoListComponent,
    NavButtonsComponent,
    AddTodoComponent,
    EditTodoComponent,
    SubTodoComponent,
    CalendarComponent,
    CalendarToolbarComponent,
    CalendarDropListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'collatask-firebase-config'),
    AppRoutingModule,
    DragDropModule,
    FormsModule, ReactiveFormsModule,
    MatTableModule, MatIconModule, MatDividerModule, MatButtonModule, MatInputModule,
    MatSelectModule, MatOptionModule, MatCardModule, MatDialogModule, MatToolbarModule,
    MatProgressBarModule, MatSnackBarModule, MatTabsModule, MatFormFieldModule, MatMenuModule,
    MatTooltipModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule,
    HttpClientModule,
    FlexLayoutModule.withConfig({ useColumnBasisZero: false })
  ],
  providers: [
    DialogComponent,
    AuthService,
    CalendarService,
    LocalStorageService,
    TodoService,
    SignalRService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: BREAKPOINT, useValue: PRINT_BREAKPOINTS, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  entryComponents: [
    PromptDialogComponent,
    AddTodoComponent,
    EditTodoComponent
  ],
  bootstrap: [RootAppComponent]
})
export class AppModule { }
