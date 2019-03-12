import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'add-todo',
    templateUrl: './add.component.html'
})
export class AddTodoComponent {

    constructor(public dialog: MatDialogRef<AddTodoComponent>) { }

    onNoClick() {
        this.dialog.close(false);
    }

    onYesClick() {

        this.dialog.close(true);
    }

}
