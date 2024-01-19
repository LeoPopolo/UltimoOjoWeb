import { Component, OnInit, inject, signal } from '@angular/core';
import { SaleService } from '../../../web/services/sale.service';
import { SaleResponse } from '../../../web/models/sale';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeeSaleComponent } from '../../components/dialog-see-sale/dialog-see-sale.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  private readonly saleServices = inject(SaleService);
  private readonly dialog = inject(MatDialog);

  sales = signal<SaleResponse[]>([])

  ngOnInit(): void {
      this.getSales();
  }

  getSales() {
    this.saleServices.getSales().subscribe(
      data => {
        this.sales.set(data.data);
      }
    );
  }

  markSaleAsPaid(saleId: number) {
    this.saleServices.markSaleAsPaid(saleId).subscribe(
      () => {
        alert('La venta fue confirmada y las plantillas fueron enviadas al cliente!');
        this.getSales();
      },
      err => {
        console.log(err);
      }
    );
  }

  openDialogSeeSale(sale: SaleResponse) {
    const dialog = this.dialog.open(DialogSeeSaleComponent, {
      width: '500px',
      data: {
        sale
      }
    });

    dialog.afterClosed().subscribe(data => {
      if (data)
        this.markSaleAsPaid(sale.id)
    });
  }
}
