import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from 'src/app/models/dialog.model';

@Component({
    selector: 'prompt-dialog',
    templateUrl: 'prompt.component.html'
})
export class PromptDialogComponent {
    constructor(
        public dialog: MatDialogRef<PromptDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialog.close();
    }
}