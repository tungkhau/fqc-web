import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorDto } from '../../data/dtos/color-dto';
import { CustomerDto } from '../../data/dtos/customer-dto';
import { ColorsConnectorService } from '../../data/services/colors-connector.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-create-color-dialog',
  templateUrl: './create-color-dialog.component.html',
  styleUrls: ['./create-color-dialog.component.scss'],
})
export class CreateColorDialogComponent implements OnInit {
  createColorForm = this.fb.group({
    code: '',
    name: '',
    customerId: '',
  });

  customerList = [];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { customerList: CustomerDto[] },
    private fb: FormBuilder,
    private colorsConnectorService: ColorsConnectorService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onCreateColor({ value }: { value: any }) {
    const submitColor: ColorDto = {
      ...value,
    };

    this.colorsConnectorService.create(submitColor).subscribe((data: any) => {
      this.productsService.reload();

      if (data.result === 'OK') this.onCloseDialog();
    });
  }
}
