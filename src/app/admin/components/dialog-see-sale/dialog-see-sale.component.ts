import { Component, inject, signal } from '@angular/core';
import { SaleResponse } from '../../../web/models/sale';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from "../../../web/components/button/button.component";
import { FileService } from '../../../../shared/services/file.service';

@Component({
    selector: 'app-dialog-see-sale',
    standalone: true,
    templateUrl: './dialog-see-sale.component.html',
    styleUrl: './dialog-see-sale.component.scss',
    imports: [ButtonComponent]
})
export class DialogSeeSaleComponent {
  private readonly dialogData = inject<IDialogData>(MAT_DIALOG_DATA);
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
    this.dialogRef.close(null);
  }

  confirmSale() {
    if (confirm('Desea confirmar la venta y enviar las plantillas por mail al cliente?'))
      this.dialogRef.close(true);
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
}

interface IDialogData {
  sale: SaleResponse
}
