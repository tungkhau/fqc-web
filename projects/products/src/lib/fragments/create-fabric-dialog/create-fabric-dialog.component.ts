import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FabricDto } from '../../data/dtos/fabric-dto';
import { CustomerDto } from '../../data/dtos/customer-dto';
import { FabricsConnectorService } from '../../data/services/fabrics-connector.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-create-fabric-dialog',
  templateUrl: './create-fabric-dialog.component.html',
  styleUrls: ['./create-fabric-dialog.component.scss'],
})
export class CreateFabricDialogComponent implements OnInit {
  createFabricForm = this.fb.group({
    code: '',
    name: '',
    customerId: '',
  });

  customerList = [];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { customerList: CustomerDto[] },
    private fb: FormBuilder,
    private fabricsConnectorService: FabricsConnectorService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onCreateFabric({ value }: { value: any }) {
    const submitFabric: FabricDto = {
      ...value,
    };

    this.fabricsConnectorService.create(submitFabric).subscribe((data: any) => {
      this.productsService.reload();

      if (data.result === 'OK') this.onCloseDialog();
    });
  }
}
