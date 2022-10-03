import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LotDto } from '../../data/dtos/lot-dto';
import { LotsConnectorService } from '../../data/services/lots-connector.service';
import { LotsService } from '../../lots.service';

@Component({
  selector: 'epl-delete-lot-dialog',
  templateUrl: './delete-lot-dialog.component.html',
  styleUrls: ['./delete-lot-dialog.component.scss'],
})
export class DeleteLotDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.lot }];
  headers: string[] = ['MÃ', 'P.O', 'SỐ CÂY', 'SỐ KG'];
  attributes: string[] = [
    'code',
    'orderCode',
    'expectedQuantity',
    'expectedWeight',
  ];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { lot: LotDto },
    private lotsConnectorService: LotsConnectorService,
    private lotsService: LotsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onDelete() {
    if (this.dialogData.lot.id)
      this.lotsConnectorService
        .delete(this.dialogData.lot.id)
        .subscribe((data) => {
          if (data.result === 'OK') this.onCloseDialog();

          this.lotsService.reload();
        });
  }
}
