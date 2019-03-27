import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService, AuthService } from 'src/app/services/_index.service';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { EditTodoComponent } from '../manage/_manage.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
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
    }

    ngOnDestroy() {
        this.todoService.clearSubjects();
    }

    btnInfo_Clicked(id: string) {
        const _dialog = this.dialog.open(EditTodoComponent, { width: '450px', data: id, disableClose: true });
        _dialog.afterOpened().subscribe(() => {
            this.todoService.get(id);
        });
        _dialog.afterClosed().subscribe(() => { });
    }

    btnRemove_Clicked(id: string) {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to remove selected to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.remove(id, this.authService.getUserEmail()).then(result => {
                        if (result !== undefined && result !== null) {
                            if (!result.success)
                                this.snackbar.open(result.message, null, { duration: 4000 });
                        }
                    });
                }
            });
    }

    btnComplete_Clicked(id: string) {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to complete selected to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.complete(id, this.authService.getUserEmail()).then(result => {
                        if (result !== undefined && result !== null) {
                            if (!result.success)
                                this.snackbar.open(result.message, null, { duration: 4000 });
                        }
                    });
                }
            });
    }

}
