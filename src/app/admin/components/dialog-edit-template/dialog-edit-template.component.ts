import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../../web/components/button/button.component";
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-edit-template',
    standalone: true,
    templateUrl: './dialog-edit-template.component.html',
    styleUrl: './dialog-edit-template.component.scss',
    imports: [ButtonComponent, FormsModule]
})
export class DialogEditTemplateComponent {
  dialogRef = inject(MatDialogRef<DialogEditTemplateComponent>)
  dialogData = inject<IDialogData>(MAT_DIALOG_DATA)

  price = this.dialogData.price;

  changePrice() {
    this.dialogRef.close(this.price);
  }
}

interface IDialogData {
  price: number
}
