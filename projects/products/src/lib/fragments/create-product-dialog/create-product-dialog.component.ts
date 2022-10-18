import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDto } from '../../data/dtos/product-dto';
import { CustomerDto } from '../../data/dtos/customer-dto';
import { ProductsConnectorService } from '../../data/services/products-connector.service';
import { ProductsService } from '../../products.service';
import { FabricDto } from '../../data/dtos/fabric-dto';
import { ColorDto } from '../../data/dtos/color-dto';
import { BehaviorSubject, map, Observable, of, startWith } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss'],
})
export class CreateProductDialogComponent implements OnInit {
  createProductForm = this.fb.group({
    customer: '',
    fabric: '',
    color: '',
  });

  fabricList: BehaviorSubject<FabricDto[]> = new BehaviorSubject<FabricDto[]>(
    []
  );

  colorList: BehaviorSubject<ColorDto[]> = new BehaviorSubject<ColorDto[]>([]);

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerList: CustomerDto[];
      fabricList: FabricDto[];
      colorList: ColorDto[];
    },
    private fb: FormBuilder,
    private productsConnectorService: ProductsConnectorService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.filteredCustomersOptions = this.createProductForm.controls[
      'customer'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;

        this.fabricList.next(
          this.data.fabricList.filter((f) => f.customerName === name)
        );

        this.colorList.next(
          this.data.colorList.filter((c) => c.customerName === name)
        );

        return name
          ? this._filterCustomer(name as string)
          : this.data.customerList.slice();
      })
    );

    // Fabric
    this.fabricList.subscribe((data) => {
      this.filteredFabricsOptions = of(data);
    });

    this.filteredFabricsOptions = this.createProductForm.controls[
      'fabric'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;

        return name
          ? this._filterFabric(name as string)
          : this.fabricList.value.slice();
      })
    );

    // Color
    this.colorList.subscribe((data) => {
      this.filteredColorsOptions = of(data);
    });

    this.filteredColorsOptions = this.createProductForm.controls[
      'color'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;

        return name
          ? this._filterColor(name as string)
          : this.colorList.value.slice();
      })
    );
  }

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onCreateProduct({ value }: { value: any }) {
    const submitProduct: any = {
      fabricId: this.createProductForm.value.fabric.id || '',
      colorId: this.createProductForm.value.color.id || '',
    };

    this.productsConnectorService
      .create(submitProduct)
      .subscribe((data: any) => {
        this.productsService.reload();
        if (data.result === 'OK') this.onCloseDialog();
      });
  }

  //@ts-ignore
  filteredCustomersOptions: Observable<CustomerDto[]>;

  displayCustomerFn(customer: CustomerDto): string {
    return customer && customer.name ? customer.name : '';
  }

  private _filterCustomer(name: string): CustomerDto[] {
    const filterValue = name.toLowerCase();

    return this.data.customerList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  //@ts-ignore
  filteredFabricsOptions: Observable<FabricDto[]>;

  displayFabricFn(fabric: FabricDto): string {
    return fabric && fabric.name ? fabric.name : '';
  }

  private _filterFabric(name: string): FabricDto[] {
    const filterValue = name.toLowerCase();

    return this.fabricList.value.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  //@ts-ignore
  filteredColorsOptions: Observable<ColorDto[]>;

  displayColorFn(color: ColorDto): string {
    return color && color.name ? color.name : '';
  }

  private _filterColor(name: string): ColorDto[] {
    const filterValue = name.toLowerCase();

    return this.colorList.value.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
