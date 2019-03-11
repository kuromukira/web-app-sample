import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
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
import { AppComponent } from './app.component';

// Services

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.fireabse, 'collatask-firebase-config'),
    AppRoutingModule,
    FormsModule,
    MatTableModule, MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule,
    MatCardModule, MatDialogModule, MatToolbarModule, MatProgressBarModule, MatSnackBarModule,
    HttpClientModule,
    FlexLayoutModule.withConfig({ useColumnBasisZero: false })
  ],
  providers: [
    { provide: BREAKPOINT, useValue: PRINT_BREAKPOINTS, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
