import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Button, Column } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { CustomerDto } from './data/dtos/customer-dto';
import { ProductDto } from './data/dtos/product-dto';
import { ColorsConnectorService } from './data/services/colors-connector.service';
import { CustomersConnectorService } from './data/services/customers-connector.service';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';
import { CreateColorDialogComponent } from './fragments/create-color-dialog/create-color-dialog.component';
import { CreateFabricDialogComponent } from './fragments/create-fabric-dialog/create-fabric-dialog.component';
import { CreateProductDialogComponent } from './fragments/create-product-dialog/create-product-dialog.component';
import { DeleteColorDialogComponent } from './fragments/delete-color-dialog/delete-color-dialog.component';
import { DeleteFabricDialogComponent } from './fragments/delete-fabric-dialog/delete-fabric-dialog.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'prd-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  productsTableColumns: Column[] = [
    {
      name: 'fabricCode',
      header: 'MÃ HÀNG',
      width: '15%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'fabricName',
      header: 'MẶT HÀNG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'colorCode',
      header: 'MÃ MÀU',
      width: '15%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'colorName',
      header: 'TÊN MÀU',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'customerName',
      header: 'KHÁCH HÀNG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  productsButtons: Button[][] = [];

  fabricsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  fabricsTableColumns: Column[] = [
    {
      name: 'code',
      header: 'MÃ HÀNG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'name',
      header: 'MẶT HÀNG',
      width: '30%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'customerName',
      header: 'KHÁCH HÀNG',
      width: '30%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  fabricsButtons: Button[][] = [];

  colorsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  colorsTableColumns: Column[] = [
    {
      name: 'code',
      header: 'MÃ MÀU',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'name',
      header: 'TÊN MÀU',
      width: '30%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'customerName',
      header: 'KHÁCH HÀNG',
      width: '30%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  colorsButtons: Button[][] = [];

  customerList: CustomerDto[] = [];

  constructor(
    private colorsConnectorService: ColorsConnectorService,
    private fabricsConnectorService: FabricsConnectorService,
    private customersConnectorService: CustomersConnectorService,
    private productsConnectorService: ProductsConnectorService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.colorsConnectorService.setApiUrl(data['apiUrl']);
    });

    this.customersConnectorService.fetch().subscribe((data) => {
      this.customerList = [...data];
    });

    this.productsService.reloadSubject.subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    this.colorsConnectorService.fetch().subscribe((data) => {
      this.colorsData.next([...data]);

      data.map((c, i) => {
        this.colorsButtons.push([
          {
            title: '',
            text: 'Xóa',
            icon: 'fa-trash',
            iconColor: null,
            action: () => {
              this.onDeleteColor(i);
            },
          },
        ]);

        return c;
      });
    });

    this.fabricsConnectorService.fetch().subscribe((data) => {
      this.fabricsData.next([...data]);

      data.map((c, i) => {
        this.fabricsButtons.push([
          {
            title: '',
            text: 'Xóa',
            icon: 'fa-trash',
            iconColor: null,
            action: () => {
              this.onDeleteFabric(i);
            },
          },
        ]);

        return c;
      });
    });

    this.productsConnectorService.fetch().subscribe((data) => {
      this.productsData.next([
        ...data.map((p: ProductDto) => {
          let customerName = this.fabricsData.value.filter(
            (f) => f.code === p.fabricCode
          )[0].customerName;
          return { ...p, customerName: customerName };
        }),
      ]);
    });
  }

  onCreateColor() {
    const dialogRef = this.dialog.open(CreateColorDialogComponent, {
      data: { customerList: this.customerList },
    });
  }

  onDeleteColor(i: number) {
    const dialogRef = this.dialog.open(DeleteColorDialogComponent, {
      data: { color: this.colorsData.value[i] },
    });
  }

  onCreateFabric() {
    const dialogRef = this.dialog.open(CreateFabricDialogComponent, {
      data: { customerList: this.customerList },
    });
  }

  onDeleteFabric(i: number) {
    const dialogRef = this.dialog.open(DeleteFabricDialogComponent, {
      data: { fabric: this.fabricsData.value[i] },
    });
  }

  onCreateProduct() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      data: {
        customerList: this.customerList,
        colorList: [...this.colorsData.value],
        fabricList: [...this.fabricsData.value],
      },
    });
  }
}
