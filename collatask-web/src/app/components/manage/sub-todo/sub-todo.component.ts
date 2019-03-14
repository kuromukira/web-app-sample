import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/models/todo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TodoService, AuthService } from 'src/app/services/_index.service';
import { DialogComponent, DialogData } from '../../dialog/dialog.component';

@Component({
    selector: 'sub-todo',
    templateUrl: './sub-todo.component.html',
    styleUrls: ['sub-todo.component.scss']
})
export class SubTodoComponent implements OnInit {

    inProgress: boolean = false;
    lSubTodos: TodoModel[] = [];
    lSubTodo: TodoModel = new TodoModel();
    lParent: TodoModel = new TodoModel();

    displayedColumns: string[] = ["description", "controls"];

    subTodoForm = new FormGroup({
        description: new FormControl('', [Validators.required])
    });

    constructor(private todoService: TodoService,
        private authService: AuthService,
        private snackbar: MatSnackBar,
        private customDialog: DialogComponent) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.todoService.$_subTodos.subscribe(data => {
            this.lSubTodos = data;
            this.btnClear_Clicked();
        });
        this.todoService.$_subTodo.subscribe(data => {
            this.lSubTodo = data === undefined || data === null ? new TodoModel() : data;
            this.subTodoForm.controls.description.setValue(this.lSubTodo.description);
        });
        this.todoService.$_todo.subscribe(data => this.lParent = data);
        this.btnClear_Clicked();
    }

    btnEditSub_Clicked(id: string) {
        this.todoService.getSub(id).then(result => {
            if (result !== undefined && result !== null) {
                if (!result.success)
                    this.snackbar.open(result.message, null, { duration: 4000 });
            }
        })
    }

    btnClear_Clicked() {
        this.lSubTodo = new TodoModel();
        this.subTodoForm.reset();
    }

    btnRemoveSub_Clicked(id: string) {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to remove selected sub to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.removeSub(this.lParent.todoId, id).then(result => {
                        if (result !== undefined && result !== null) {
                            if (!result.success)
                                this.snackbar.open(result.message, null, { duration: 4000 });
                        }
                    });
                }
            });
    }

    btnCompleteSub_Clicked(id: string) {
        this.customDialog.Prompt(new DialogData('Confirm', '', 'Are you sure you want to complete selected sub to-do?', null))
            .afterClosed().subscribe(result => {
                if (result) {
                    this.todoService.completeSub(this.lParent.todoId, id).then(result => {
                        if (result !== undefined && result !== null) {
                            if (!result.success)
                                this.snackbar.open(result.message, null, { duration: 4000 });
                        }
                    });
                }
            });
    }

    btnSave_Clicked() {
        if (this.subTodoForm.valid) {
            this.lSubTodo.description = this.subTodoForm.controls.description.value;
            this.lSubTodo.parentTodoId = this.lParent.todoId;
            this.lSubTodo.addedBy = this.lParent.addedBy;
            if (this.lSubTodo.todoId === undefined || this.lSubTodo.todoId === null || this.lSubTodo.todoId === '') {
                this.lSubTodo.addedBy = this.authService.getUserEmail();
                this.todoService.addSub(this.lSubTodo).then(result => {
                    if (result !== undefined && result !== null) {
                        if (!result.success)
                            this.snackbar.open(result.message, null, { duration: 4000 });
                    }
                })
            }
            else this.todoService.modifySub(this.lSubTodo).then(result => {
                if (result !== undefined && result !== null) {
                    if (!result.success)
                        this.snackbar.open(result.message, null, { duration: 4000 });
                }
            });
        }
    }

}
