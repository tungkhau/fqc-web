import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FabricDto } from '../../data/dtos/fabric-dto';
import { FabricsConnectorService } from '../../data/services/fabrics-connector.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'epl-delete-fabric-dialog',
  templateUrl: './delete-fabric-dialog.component.html',
  styleUrls: ['./delete-fabric-dialog.component.scss'],
})
export class DeleteFabricDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.fabric }];
  headers: string[] = ['MÃ HÀNG', 'MẶT HÀNG', 'KHÁCH HÀNG'];
  attributes: string[] = ['code', 'name', 'customerName'];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { fabric: FabricDto },
    private fabricsConnectorService: FabricsConnectorService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onDelete() {
    if (this.dialogData.fabric.id)
      this.fabricsConnectorService
        .delete(this.dialogData.fabric.id)
        .subscribe((data) => {
          this.productsService.reload();
          this.onCloseDialog();
        });
  }
}
