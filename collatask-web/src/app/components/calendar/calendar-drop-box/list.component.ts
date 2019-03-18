import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TodoService, AuthService } from 'src/app/services/_index.service';
import { TodoModel } from 'src/app/models/todo.model';
import { DialogComponent, DialogData } from '../../dialog/dialog.component';
import { EditTodoComponent } from '../../manage/_manage.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
    selector: 'calendar-drop-box',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class CalendarDropListComponent implements OnInit {

    lTodosPerDay: TodoModel[] = [];
    inProgress: boolean;

    private lBoxDate: Date;
    @Input() set boxDate(date: Date) {
        this.lBoxDate = new Date(date);
    }

    constructor(private todoService: TodoService,
        private authService: AuthService,
        private snackbar: MatSnackBar,
        private dialog: MatDialog,
        private customDialog: DialogComponent) { }

    ngOnInit() {
        this.todoService.$_inProgress.subscribe(data => this.inProgress = data);
        this.todoService.$_todos.subscribe(data => {
            this.lTodosPerDay = [];
            for (let i = 0; i < data.length; i++) {
                if (new Date(data[i].todoDate).toDateString() == this.lBoxDate.toDateString())
                    this.lTodosPerDay.push(data[i]);
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            let _todoModel: any = event.previousContainer.data[event.previousIndex];
            _todoModel.todoDate = this.lBoxDate;
            _todoModel.currentUser = this.authService.getUserEmail();
            this.todoService.modify(_todoModel).then(result => {
                if (result !== undefined && result !== null) {
                    if (!result.success)
                        this.snackbar.open(result.message, null, { duration: 4000 });
                }
            });
        }
    }

    // Possible duplicate code with home.component

    btnInfo_Clicked(id: string) {
        const _dialog = this.dialog.open(EditTodoComponent, { width: '450px', data: id, disableClose: true });
        _dialog.afterOpened().subscribe(() => {
            this.todoService.get(id);
        });
        _dialog.afterClosed().subscribe(() => { });
    }

    btnDelete_Clicked(id: string) {
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
