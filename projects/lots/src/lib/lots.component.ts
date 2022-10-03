import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Button, Column } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { FabricDto } from './data/dtos/fabric-dto';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { LotsConnectorService } from './data/services/lots-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';
import { CreateLotDialogComponent } from './fragments/create-lot-dialog/create-lot-dialog.component';
import { DeleteLotDialogComponent } from './fragments/delete-lot-dialog/delete-lot-dialog.component';
import { LotsService } from './lots.service';

@Component({
  selector: 'lot-lot',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.scss'],
})
export class LotsComponent implements OnInit {
  productsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  productTableColumns: Column[] = [
    {
      name: 'fabricCode',
      header: 'MÃ HÀNG',
      width: '15%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
      primaryText: {
        color: '#56717E',
        fontWeight: '700',
      },
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
      isSortable: true,
      primaryText: {
        color: '#56717E',
        fontWeight: '700',
      },
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

  lotsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  shownLotsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  lotTableColumns: Column[] = [
    {
      name: 'code',
      header: 'MÃ LOT',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      primaryText: {
        color: '#56717E',
        fontWeight: '700',
      },
    },
    {
      name: 'orderCode',
      header: 'P.O',
      width: '15%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
      primaryText: {
        color: '#56717E',
        fontWeight: '700',
      },
    },
    {
      name: 'expectedQuantity',
      header: 'SỐ CÂY',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isSortable: true,
    },
    {
      name: 'expectedWeight',
      header: 'SỐ KG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isSortable: true,
    },
    {
      name: 'hasMeasurement',
      header: 'THÔNG SỐ',
      width: '25%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
      primaryText: {
        color: '#28A745',
        fontWeight: '700',
      },
      secondaryText: {
        content: '× Chưa có',
        color: '#DF5B5B',
        fontWeight: '700',
      },
    },
  ];

  lotsButtons: Button[][] = [];

  fabricList: FabricDto[] = [];

  constructor(
    private productConnectorService: ProductsConnectorService,
    private fabricConnectorService: FabricsConnectorService,
    private lotsConnectorService: LotsConnectorService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private lotsService: LotsService
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.lotsConnectorService.setApiUrl(data['apiUrl']);
    });

    this.lotsService.reloadSubject.subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.fabricConnectorService.fetch().subscribe((data) => {
      this.fabricList = [...data];

      this.productConnectorService.fetch().subscribe((data) => {
        this.productsData.next([
          ...data.map((p, i) => {
            let customerName = this.fabricList.filter(
              (f) => (f.code = p.fabricCode)
            )[0].customerName;

            this.productsButtons.push([
              {
                title: '',
                text: 'Xem lot',
                icon: 'fa-plus',
                iconColor: null,
                action: () => {
                  this.onViewLots(i);
                },
              },
            ]);

            return {
              ...p,
              customerName,
              criterionName: p.criterionName ? p.criterionName : 'Chưa có',
              label: p.label ? p.label : 'Chưa có',
            };
          }),
        ]);
      });
    });

    this.lotsConnectorService.fetch().subscribe((data) => {
      this.lotsData.next([
        ...data.map((l, i) => {
          this.lotsButtons.push([
            {
              title: '',
              text: 'Xóa',
              icon: 'fa-trash',
              iconColor: null,
              action: () => {
                this.onDeleteLot(i);
              },
            },
          ]);

          return {
            ...l,
            hasMeasurement: l.measurement !== null ? '✓ Đã có' : '× Chưa có',
          };
        }),
      ]);

      if (this.currentProductIndex > -1)
        this.onViewLots(this.currentProductIndex);
    });
  }

  onViewLots(i: number) {
    this.currentProductIndex = i;

    this.shownLotsData.next(
      this.lotsData.value.filter(
        (lot) => lot.productId === this.productsData.value[i].id
      )
    );
  }

  currentProductIndex = -1;

  onCreateLot() {
    const dialogRef = this.dialog.open(CreateLotDialogComponent, {
      data: { productId: this.productsData.value[this.currentProductIndex].id },
    });
  }

  onDeleteLot(i: number) {
    const dialogRef = this.dialog.open(DeleteLotDialogComponent, {
      data: { lot: this.lotsData.value[i] },
    });
  }
}
