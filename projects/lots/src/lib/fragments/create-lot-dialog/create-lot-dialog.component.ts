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
import { LotsService } from '../../lots.service';

@Component({
  selector: 'app-create-lot-dialog',
  templateUrl: './create-lot-dialog.component.html',
  styleUrls: ['./create-lot-dialog.component.scss'],
})
export class CreateLotDialogComponent implements OnInit {
  createLotForm = this.fb.group({
    lotList: this.fb.array([]),
  });

  //@ts-ignore
  @ViewChild('codeInput') codeInput: ElementRef;
  //@ts-ignore
  @ViewChild('boInput') boInput: ElementRef;
  //@ts-ignore
  @ViewChild('quantityInput') quantityInput: ElementRef;
  //@ts-ignore
  @ViewChild('weightInput') weightInput: ElementRef;

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private lotsConnectorService: LotsConnectorService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { productId: string },
    private lotsService: LotsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  getLots() {
    return this.createLotForm.get('lotList') as FormArray;
  }

  onAddLot() {
    let newLot = {
      code: this.codeInput.nativeElement.value,
      orderCode: this.boInput.nativeElement.value,
      expectedQuantity: this.quantityInput.nativeElement.value,
      expectedWeight: this.weightInput.nativeElement.value,
      productId: this.dialogData.productId,
    };

    this.lotsConnectorService.create(newLot).subscribe((data: any) => {
      if (data.result === 'OK') {
        this.getLots().controls = [
          this.fb.group(newLot),
          ...this.getLots().controls,
        ];

        this.codeInput.nativeElement.value = '';
        this.boInput.nativeElement.value = '';
        this.quantityInput.nativeElement.value = '';
        this.weightInput.nativeElement.value = '';

        this.lotsService.reload();
      }
    });
  }

  onCreateLot({ value }: { value: any }) {
    this.onCloseDialog();
  }
}
