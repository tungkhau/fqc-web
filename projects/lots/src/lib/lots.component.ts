import { Component, OnInit } from '@angular/core';
import { Button, Column } from 'ast';
import { BehaviorSubject } from 'rxjs';

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
      width: '12%',
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
      width: '12%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'colorCode',
      header: 'MÃ MÀU',
      width: '12%',
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
      width: '12%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'customerName',
      header: 'KHÁCH HÀNG',
      width: '15%',
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
      width: '12%',
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
      width: '12%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'expectedWeight',
      header: 'SỐ CÂY',
      width: '12%',
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
      name: 'measurement',
      header: 'THÔNG SỐ',
      width: '',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
      primaryText: {
        color: '#56717E',
        fontWeight: '700',
      },
    },
  ];

  lotsButtons: Button[][] = [];

  constructor() {}

  ngOnInit(): void {}
}
