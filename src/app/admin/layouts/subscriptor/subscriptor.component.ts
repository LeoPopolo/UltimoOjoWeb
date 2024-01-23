import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditTemplateComponent } from '../../components/dialog-edit-template/dialog-edit-template.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscriptorService } from '../../services/subscriptor.service';
import { ISubscriptor } from '../../models/subscriptor';
import { ButtonComponent } from "../../../web/components/button/button.component";

@Component({
    selector: 'app-subscriptors',
    standalone: true,
    templateUrl: './subscriptor.component.html',
    styleUrl: './subscriptor.component.scss',
    imports: [CurrencyPipe, ButtonComponent]
})
export class SubscriptorsComponent implements OnInit {

  private readonly subscriptorServices = inject(SubscriptorService)
  private readonly dialog = inject(MatDialog)
  private readonly snackbarServices = inject(MatSnackBar)

  subscriptors = signal<ISubscriptor[]>([]);

  ngOnInit(): void {
    this.getSubscriptors();
  }

  getSubscriptors() {
    this.subscriptorServices.getSubscriptors().subscribe(
      data => {
        this.subscriptors.set(data.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  removeSubscriptor(subscriptorId: number) {
    this.subscriptorServices.deleteSubscriptor(subscriptorId).subscribe(() => {
      this.openSnackbar('Suscriptor eliminado con éxito');
      this.getSubscriptors();
    });
  }

  copyMails() {
    const areaDeTransferencia = document.createElement('textarea');
    areaDeTransferencia.value = this.subscriptors().map(item => item.email).join(',');
    document.body.appendChild(areaDeTransferencia);
    areaDeTransferencia.select();
    document.execCommand('copy');
    document.body.removeChild(areaDeTransferencia);
    this.openSnackbar('Email copiados al portapapeles');
  }

  // openDialogEditSubscriptor(subscriptor: ISubscriptor) {
  //   const dialog = this.dialog.open(DialogEditSubscriptorComponent, {
  //     width: '300px',
  //     data: {
  //       price: Subscriptor.price
  //     }
  //   });

  //   dialog.afterClosed().subscribe(data => {
  //     const updatedSubscriptor = {
  //       ...Subscriptor,
  //       price: data
  //     }

  //     this.updateSubscriptor(updatedSubscriptor);
  //   });
  // }

  openSnackbar(message: string) {
    this.snackbarServices.open(message, 'OK', {
      duration: 3000,
      panelClass: ['Snackbar']
    });
  }
}
