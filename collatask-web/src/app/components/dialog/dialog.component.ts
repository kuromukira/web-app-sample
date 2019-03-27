export * from 'src/app/models/dialog.model';
export * from './prompt/prompt.component';

import * as prompt from '../dialog/prompt/prompt.component';
import { DialogData } from 'src/app/models/dialog.model';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogComponent {
    constructor(private dialog: MatDialog) { }

    public Prompt(data: DialogData) {
        return this.dialog.open(prompt.PromptDialogComponent, {
            width: '400px',
            data: data
        });
    }

    public Alert(data: DialogData) {
        return null;
    }

    public Message(data: DialogData) {
        return null;
    }
}