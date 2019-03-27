import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TodoService, AuthService, SignalRService } from 'src/app/services/_index.service';
import { TodoModel } from 'src/app/models/todo.model';
import { DayDate } from 'src/app/models/calendar.model';

@Component({
    selector: 'edit-todo',
    templateUrl: './edit.component.html'
})
export class EditTodoComponent implements OnInit {

    inProgress: boolean = false;
    lTodo: TodoModel = new TodoModel();
    maxDate: Date;
    minDate: Date;

    // #region Form
    editForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        addedBy: new FormControl('', [Validators.required, Validators.email]),
        todoDate: new FormControl('', [Validators.required])
    });
    // #endregion

    constructor(
        public dialog: MatDialogRef<EditTodoComponent>,
        private authService: AuthService,
        private todoService: TodoService,
        private signalRService: SignalRService,
        private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.todoService.$_todo.subscribe(data => {
            this.lTodo = data === undefined || data === null ? new TodoModel() : data;
            this.editForm.controls.description.setValue(this.lTodo.description);
            this.editForm.controls.addedBy.setValue(this.lTodo.addedBy);
            this.editForm.controls.todoDate.setValue(this.lTodo.todoDate);
            this.minDate = new Date(new Date().getFullYear(), new Date(data.todoDate).getMonth(), 1);
            this.maxDate = new Date(new Date().getFullYear(), new Date(data.todoDate).getMonth() + 1, 0);
        });

        // ! SignalR
        this.signalRService.$_notifcation.subscribe(notif => {
            if (notif !== null && notif !== undefined) {
                if (notif.refresh)
                    this.todoService.get(this.lTodo.todoId);
            }
        });
    }

    onNoClick() {
        this.dialog.close(false);
    }

    onYesClick() {
        if (this.editForm.valid) {
            this.lTodo.description = this.editForm.controls.description.value;
            this.lTodo.todoDate = this.editForm.controls.todoDate.value;
            this.lTodo.currentUser = this.authService.getUserEmail();
            this.todoService.modify(this.lTodo).then(result => {
                if (result !== undefined && result !== null) {
                    if (!result.success)
                        this.snackbar.open(result.message, null, { duration: 4000 });
                }
            }).finally(() => this.dialog.close(true));
        }
    }

}
