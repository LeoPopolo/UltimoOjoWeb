import { Component, OnInit, inject, signal } from '@angular/core';
import { SaleService } from '../../../web/services/sale.service';
import { SaleResponse } from '../../../web/models/sale';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeeSaleComponent } from '../../components/dialog-see-sale/dialog-see-sale.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  standalone: true,
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  imports: [PaginatorComponent, FormsModule],
})
export class SalesComponent implements OnInit {
  private readonly saleServices = inject(SaleService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbarServices = inject(MatSnackBar);

  searchFilter: string = '';

  totalItems = signal<number>(1);
  maxPages = signal<number>(1);
  sales = signal<SaleResponse[]>([]);

  currentPage: number = 1;
  readonly pageSize = 10;

  ngOnInit(): void {
    this.getSales();
  }

  getSales(filter?: string) {
    this.saleServices
      .getSales(filter, this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.sales.set(data.data);
        this.maxPages.set(data.maxPages);
        this.totalItems.set(data.totalItems);
      });
  }

  markSaleAsPaid(saleId: number) {
    this.saleServices.markSaleAsPaid(saleId).subscribe(
      () => {
        this.openSnackbar(
          'La venta fue confirmada y las plantillas fueron enviadas al cliente!'
        );
        this.getSales();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialogSeeSale(sale: SaleResponse) {
    const dialog = this.dialog.open(DialogSeeSaleComponent, {
      width: '500px',
      data: {
        sale,
      },
    });

    dialog.afterClosed().subscribe((data) => {
      if (data) this.markSaleAsPaid(sale.id);
    });
  }

  openSnackbar(message: string) {
    this.snackbarServices.open(message, 'OK', {
      duration: 3000,
      panelClass: ['Snackbar'],
    });
  }

  setFilter() {
    this.getSales(this.searchFilter);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getSales(this.searchFilter);
  }
}
