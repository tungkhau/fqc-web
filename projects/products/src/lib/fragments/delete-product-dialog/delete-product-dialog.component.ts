import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDto } from '../../data/dtos/product-dto';
import { ProductsConnectorService } from '../../data/services/products-connector.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'epl-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss'],
})
export class DeleteProductDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.product }];
  headers: string[] = [
    'MÃ HÀNG',
    'MẶT HÀNG',
    'MÃ MÀU',
    'TÊN MÀU',
    'KHÁCH HÀNG',
  ];
  attributes: string[] = [
    'fabricCode',
    'fabricName',
    'colorCode',
    'colorName',
    'customerName',
  ];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { product: ProductDto },
    private productsConnectorService: ProductsConnectorService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onDelete() {
    if (this.dialogData.product.id)
      this.productsConnectorService
        .delete(this.dialogData.product.id)
        .subscribe((data) => {
          this.productsService.reload();
          this.onCloseDialog();
        });
  }
}
