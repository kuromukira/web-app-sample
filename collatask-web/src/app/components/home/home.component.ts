import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService, AuthService } from 'src/app/services/_index.service';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { AddTodoComponent, EditTodoComponent } from '../manage/_manage.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    inProgress: boolean = false;
    lTodos: TodoModel[] = [];

    constructor(private router: Router,
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private todoService: TodoService,
        private dialog: MatDialog,
        private customDialog: DialogComponent) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.todoService.$_todos.subscribe(data => this.lTodos = data === undefined || data === null ? [] : data);
        this.btnRefresh_Clicked();
    }

    ngOnDestroy() {
        this.todoService.clearSubjects();
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

    btnInfo_Clicked(id: string) {
        const _dialog = this.dialog.open(EditTodoComponent, { width: '450px', data: id, disableClose: true });
        _dialog.afterOpened().subscribe(() => {
            this.todoService.get(id).then(result => {
                if (result.success)
                    this.todoService.getSubOf(id);
            });
        });
        _dialog.afterClosed().subscribe(result => {
            if (result)
                this.btnRefresh_Clicked();
        });
    }

    btnAdd_Clicked() {
        this.dialog.open(AddTodoComponent, { width: '450px', disableClose: true })
            .afterClosed().subscribe(result => {
                if (result)
                    this.btnRefresh_Clicked();
            });
    }

    btnRemove_Clicked(id: string) {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to remove selected to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.remove(id).then(result => {
                        if (result.success)
                            this.btnRefresh_Clicked();
                        else this.snackbar.open(result.message, '', { duration: 4000 });
                    });
                }
            });
    }

    btnComplete_Clicked(id: string) {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to complete selected to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.complete(id).then(result => {
                        if (result.success)
                            this.btnRefresh_Clicked();
                        else this.snackbar.open(result.message, '', { duration: 4000 });
                    });
                }
            });
    }

}
