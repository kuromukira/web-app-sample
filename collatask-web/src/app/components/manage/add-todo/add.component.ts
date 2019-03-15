import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService, AuthService } from 'src/app/services/_index.service';
import { TodoModel } from 'src/app/models/todo.model';
import { DayDate } from 'src/app/models/calendar.model';

@Component({
    selector: 'add-todo',
    templateUrl: './add.component.html'
})
export class AddTodoComponent implements OnInit {

    inProgress: boolean = false;
    maxDate: Date;
    minDate: Date;

    // #region Form
    addForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        addedBy: new FormControl('', [Validators.required, Validators.email]),
        todoDate: new FormControl('', [Validators.required])
    });
    // #endregion

    constructor(public dialog: MatDialogRef<AddTodoComponent>,
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private todoService: TodoService,
        @Inject(MAT_DIALOG_DATA) public data: DayDate) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        if (this.data.month !== undefined) {
            this.minDate = new Date(new Date().getFullYear(), this.data.month, 1);
            this.maxDate = new Date(new Date().getFullYear(), this.data.month + 1, 0);
        }
        this.addForm.controls.todoDate.setValue(this.data.date);
        this.addForm.controls.addedBy.setValue(this.authService.getUserEmail());
    }

    onNoClick() {
        this.dialog.close(false);
    }

    onYesClick() {
        if (this.addForm.valid) {
            let _todo: TodoModel = new TodoModel();
            _todo.description = this.addForm.controls.description.value;
            _todo.addedBy = this.addForm.controls.addedBy.value;
            _todo.todoDate = this.addForm.controls.todoDate.value;
            _todo.currentUser = this.authService.getUserEmail();
            this.todoService.add(_todo).then(result => {
                if (result !== undefined && result !== null) {
                    if (!result.success)
                        this.snackbar.open(result.message, null, { duration: 4000 });
                }
            }).finally(() => this.dialog.close(true));
        }
    }

}
