import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Button, Column } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { FabricDto } from './data/dtos/fabric-dto';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { LotsConnectorService } from './data/services/lots-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';

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
      isFilterable: true,
      isSortable: false,
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

  lotTableColumns: Column[] = [
    {
      name: 'code',
      header: 'MÃ LOT',
      width: '20%',
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
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'expectedWeight',
      header: 'SỐ KG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
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
    },
  ];

  lotsButtons: Button[][] = [];

  fabricList: FabricDto[] = [];

  constructor(
    private productConnectorService: ProductsConnectorService,
    private fabricConnectorService: FabricsConnectorService,
    private lotsConnectorService: LotsConnectorService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.lotsConnectorService.setApiUrl(data['apiUrl']);
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
                text: 'Gán tiêu chuẩn ',
                icon: 'fa-plus',
                iconColor: null,
                action: () => {
                  // this.onAddCriterion(i);
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
          return {
            ...l,
            hasMeasurement:
              l.measurement !== null
                ? '✓ Đã có thông số'
                : '× Chưa có thông số',
          };
        }),
      ]);
    });
  }
}
