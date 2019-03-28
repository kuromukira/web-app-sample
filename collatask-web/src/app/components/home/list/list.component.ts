import { Component, Input } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService, AuthService } from 'src/app/services/_index.service';
import { DialogComponent, DialogData } from '../../dialog/dialog.component';
import { EditTodoComponent } from '../../manage/_manage.component';

@Component({
    selector: 'todo-list',
    templateUrl: './list.component.html'
})
export class TodoListComponent {

    inProgress: boolean = false;
    private todo: TodoModel;
    @Input() set todoModel(todo: TodoModel) {
        this.todo = todo;
    }

    constructor(private snackbar: MatSnackBar,
        private authService: AuthService,
        private todoService: TodoService,
        private dialog: MatDialog,
        private customDialog: DialogComponent) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
    }

    btnInfo_Clicked() {
        const _dialog = this.dialog.open(EditTodoComponent, { width: '450px', data: this.todo.todoId, disableClose: true });
        _dialog.afterOpened().subscribe(() => {
            this.todoService.get(this.todo.todoId);
        });
        _dialog.afterClosed().subscribe(() => { });
    }

    btnRemove_Clicked() {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to remove selected to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.remove(this.todo.todoId, this.authService.getUserEmail()).then(result => {
                        if (result !== undefined && result !== null) {
                            if (!result.success)
                                this.snackbar.open(result.message, null, { duration: 4000 });
                        }
                    });
                }
            });
    }

    btnComplete_Clicked() {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to complete selected to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.complete(this.todo.todoId, this.authService.getUserEmail()).then(result => {
                        if (result !== undefined && result !== null) {
                            if (!result.success)
                                this.snackbar.open(result.message, null, { duration: 4000 });
                        }
                    });
                }
            });
    }

}
