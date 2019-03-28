import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService, SignalRService } from './services/_index.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class RootAppComponent implements OnInit, OnDestroy {

  constructor(private todoService: TodoService,
    private signalRService: SignalRService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.signalRService.addNotifEventHandler();
    this.signalRService.$_notifcation.subscribe(notif => {
      if (notif !== null && notif !== undefined) {
        if (notif.message !== undefined && notif.message !== null && notif.message !== '')
          this.snackbar.open(notif.message, '', { duration: 4000 });
        if (notif.refresh)
          this.todoService.getAll();
      }
    });
  }

  ngOnDestroy() {
    this.signalRService.stopConnection();
  }

}
