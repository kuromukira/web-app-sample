import { Component, Inject, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/_index.service';
import { TodoModel } from 'src/app/models/todo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
    selector: 'edit-todo',
    templateUrl: './edit.component.html'
})
export class EditTodoComponent implements OnInit {

    inProgress: boolean = false;
    lTodo: TodoModel = new TodoModel();

    // #region Form
    editForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        addedBy: new FormControl('', [Validators.required, Validators.required])
    });
    // #endregion

    constructor(
        public dialog: MatDialogRef<EditTodoComponent>,
        private todoService: TodoService,
        private snackbar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public todoId: string) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.todoService.$_todo.subscribe(data => {
            this.lTodo = data === undefined || data === null ? new TodoModel() : data;
            this.editForm.controls.description.setValue(this.lTodo.description);
            this.editForm.controls.addedBy.setValue(this.lTodo.addedBy);
        });
    }

    onNoClick() {
        this.dialog.close(false);
    }

    onYesClick() {
        if (this.editForm.valid) {
            this.lTodo.description = this.editForm.controls.description.value;
            this.todoService.modify(this.lTodo).then(result => {
                if (result !== undefined && result !== null) {
                    if (!result.success)
                        this.snackbar.open(result.message, null, { duration: 4000 });
                }
            }).finally(() => this.dialog.close(true));
        }
    }

}
