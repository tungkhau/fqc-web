import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorDto } from '../../data/dtos/color-dto';
import { ColorsConnectorService } from '../../data/services/colors-connector.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'epl-delete-color-dialog',
  templateUrl: './delete-color-dialog.component.html',
  styleUrls: ['./delete-color-dialog.component.scss'],
})
export class DeleteColorDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.color }];
  headers: string[] = ['MÃ MÀU', 'TÊN MÀU', 'KHÁCH HÀNG'];
  attributes: string[] = ['code', 'name', 'customerName'];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { color: ColorDto },
    private colorsConnectorService: ColorsConnectorService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onDelete() {
    if (this.dialogData.color.id)
      this.colorsConnectorService
        .delete(this.dialogData.color.id)
        .subscribe((data) => {
          this.productsService.reload();
          this.onCloseDialog();
        });
  }
}
