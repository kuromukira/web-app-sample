import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService, AuthService } from 'src/app/services/_index.service';
import { TodoModel } from 'src/app/models/todo.model';

@Component({
    selector: 'add-todo',
    templateUrl: './add.component.html'
})
export class AddTodoComponent implements OnInit {

    inProgress: boolean = false;

    // #region Form
    addForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        addedBy: new FormControl('', [Validators.required, Validators.required])
    });
    // #endregion

    constructor(public dialog: MatDialogRef<AddTodoComponent>,
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private todoService: TodoService) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
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
            this.todoService.add(_todo).then(result => {
                if (!result.success)
                    this.snackbar.open(result.message, null, { duration: 4000 });
            }).finally(() => this.dialog.close(true));
        }
    }

}
