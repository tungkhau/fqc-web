import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LotDto } from '../../data/dtos/lot-dto';
import { MeasurementDto } from '../../data/dtos/measurement-dto';
import { MeasurementsConnectorService } from '../../data/services/measurements-connector.service';
import { LotsService } from '../../lots.service';

@Component({
  selector: 'epl-delete-measurement-dialog',
  templateUrl: './delete-measurement-dialog.component.html',
  styleUrls: ['./delete-measurement-dialog.component.scss'],
})
export class DeleteMeasurementDialogComponent implements OnInit {
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
    private measurementsConnectorService: MeasurementsConnectorService,
    private lotsService: LotsService
  ) {}

  ngOnInit(): void {
    if (this.dialogData.lot.measurement) {
      this.headers = [
        ...this.headers,
        'KHỔ PHỦ BÌ',
        'KHỔ HỮU DỤNG',
        'ĐỊNH LƯỢNG',
      ];

      this.attributes = [
        ...this.attributes,
        'totalWidth',
        'usableWidth',
        'areaDensity',
      ];
    }
  }

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onDelete() {
    if (this.dialogData.lot.measurement?.id)
      this.measurementsConnectorService
        .delete(this.dialogData.lot.measurement?.id)
        .subscribe((data) => {
          if (data.result === 'OK') this.onCloseDialog();

          this.lotsService.reload();
        });
  }
}
