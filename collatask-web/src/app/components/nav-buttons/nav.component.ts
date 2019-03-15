import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService, AuthService, SignalRService } from 'src/app/services/_index.service';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { AddTodoComponent } from '../manage/_manage.component';
import { DayDate } from 'src/app/models/calendar.model';

@Component({
    selector: 'nav-buttons',
    templateUrl: './nav.component.html'
})
export class NavButtonsComponent implements OnInit, OnDestroy {

    inProgress: boolean = false;
    lTodos: TodoModel[] = [];

    constructor(private router: Router,
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private todoService: TodoService,
        private signalRService: SignalRService,
        private dialog: MatDialog,
        private customDialog: DialogComponent) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.btnRefresh_Clicked();

        // ! SignalR
        this.signalRService.startConnection();
        this.signalRService.addNotifEventHandler();
        this.signalRService.$_notifcation.subscribe(notif => {
            if (notif !== null && notif !== undefined) {
                if (notif.message !== undefined && notif.message !== null && notif.message !== '')
                    this.snackbar.open(notif.message, '', { duration: 4000 });
                if (notif.refresh)
                    this.btnRefresh_Clicked();
            }
        });
    }

    ngOnDestroy() {
        this.signalRService.stopConnection();
    }

    btnSignOut_Clicked() {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to leave?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.inProgress = true;
                    this.authService.signOut().then((result) => {
                        if (result.success)
                            this.router.navigateByUrl('/login');
                        else this.snackbar.open(result.message, '', { duration: 4000 });
                    }).finally(() => this.inProgress = false);
                }
            });
    }

    btnRefresh_Clicked() {
        this.todoService.getAll();
    }

    btnCalendar_Click() {
        this.router.navigate(['calendar']);
    }

    btnHome_Click() {
        this.router.navigate(['home']);
    }

    btnAdd_Clicked() {
        let _dayDate: DayDate = new DayDate();
        _dayDate.date = new Date();
        _dayDate.month = new Date().getMonth();
        this.dialog.open(AddTodoComponent, {
            width: '450px', disableClose: true,
            data: _dayDate
        }).afterClosed().subscribe(() => { });
    }

}
