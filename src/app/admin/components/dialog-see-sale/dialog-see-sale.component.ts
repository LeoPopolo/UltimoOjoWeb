import { Component, inject, signal } from '@angular/core';
import { SaleResponse } from '../../../web/models/sale';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from "../../../web/components/button/button.component";
import { FileService } from '../../../shared/services/file.service';
import { DialogAlertComponent } from '../../../shared/components/dialog-alert/dialog-alert.component';

@Component({
    selector: 'app-dialog-see-sale',
    standalone: true,
    templateUrl: './dialog-see-sale.component.html',
    styleUrl: './dialog-see-sale.component.scss',
    imports: [ButtonComponent]
})
export class DialogSeeSaleComponent {
  private readonly dialogData = inject<IDialogData>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject(MatDialogRef<DialogSeeSaleComponent>);
  private readonly fileServices = inject(FileService);

  sale = signal<SaleResponse>({
    id: 0,
    customerName: '',
    customerLastName: '',
    customerPhoneNumber: '',
    customerEmail: '',
    customerAddress: '',
    customerCuit: '',
    isPaid: false,
    total: 0,
    receiptPath: '',
    templates: []
  });

  constructor() {
    this.sale.set(this.dialogData.sale);
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  confirmSale() {
    this.confirmDialog();
  }

  downloadReceipt() {
    this.fileServices.downloadFile(this.sale().receiptPath).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Comprobante ${this.sale().customerName} ${this.sale().customerLastName} - ${this.sale().customerCuit}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  confirmDialog() {
    const dialog = this.dialog.open(DialogAlertComponent, {
      data: {
        title: 'Confirmar compra',
        message: '¿Desea confirmar la compra y enviar las plantillas por mail al cliente?',
        hasCancelButton: true
      }
    });

    dialog.afterClosed().subscribe(data => {
      if (data) {
        this.dialogRef.close(true);
      }
    })
  }
}

interface IDialogData {
  sale: SaleResponse
}
