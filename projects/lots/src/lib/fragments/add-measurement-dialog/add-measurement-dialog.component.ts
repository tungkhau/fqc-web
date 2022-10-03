import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LotDto } from '../../data/dtos/lot-dto';
import { LotsConnectorService } from '../../data/services/lots-connector.service';
import { MeasurementsConnectorService } from '../../data/services/measurements-connector.service';
import { LotsService } from '../../lots.service';

@Component({
  selector: 'app-add-measurement-dialog',
  templateUrl: './add-measurement-dialog.component.html',
  styleUrls: ['./add-measurement-dialog.component.scss'],
})
export class AddMeasurementDialogComponent implements OnInit {
  measurementForm = this.fb.group({
    totalWidth: '',
    usableWidth: '',
    areaDensity: '',
  });

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private measurementsConnectorService: MeasurementsConnectorService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { lot: LotDto },
    private lotsService: LotsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onSubmit({ value }: { value: any }) {
    if (this.dialogData.lot.id)
      if (this.dialogData.lot.measurement) {
      } else {
        this.measurementsConnectorService
          .create({
            ...this.measurementForm.value,
            lotId: this.dialogData.lot.id,
          })
          .subscribe((data) => {
            this.lotsService.reload();
            if (data.result === 'OK') this.onCloseDialog();
          });
      }
  }
}
