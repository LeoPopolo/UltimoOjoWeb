import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  standalone: true,
  imports: [],
  templateUrl: './dialog-alert.component.html',
  styleUrl: './dialog-alert.component.scss'
})
export class DialogAlertComponent {
  public readonly data = inject<IDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<DialogAlertComponent>);

  close(confirm: boolean) {
    this.dialogRef.close(confirm);
  }
}

interface IDialogData {
  title: string,
  message: string,
  hasCancelButton: boolean
}
