import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { CriteriaService } from './criteria.service';
import { CriteriaDto } from './data/dtos/criteria-dto';
import { FabricDto } from './data/dtos/fabric-dto';
import { CriteriaConnectorService } from './data/services/criteria-connector.service';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';
import { AddCriteriaDialogComponent } from './fragments/add-criteria-dialog/add-criteria-dialog.component';
import { CreateCriteriaDialogComponent } from './fragments/create-criteria-dialog/create-criteria-dialog.component';
import { DeleteCriteriaDialogComponent } from './fragments/delete-criteria-dialog/delete-criteria-dialog.component';
import { ViewCriteriaDialogComponent } from './fragments/view-criteria-dialog/view-criteria-dialog.component';

@Component({
  selector: 'cri-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements OnInit {
  productData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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
    {
      name: 'criterionName',
      header: 'TIÊU CHUẨN',
      width: '15%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
      primaryText: {
        color: '#56717E',
        fontWeight: '700',
      },
      secondaryText: {
        color: '#B9C8CF',
        content: 'Chưa có',
        fontWeight: '600',
        fontStyle: 'italic',
      },
    },
    {
      name: 'label',
      header: 'MẪU TEM',
      width: '12%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
      primaryText: {
        color: '#56717E',
        fontWeight: '700',
      },
      secondaryText: {
        color: '#B9C8CF',
        content: 'Chưa có',
        fontWeight: '600',
        fontStyle: 'italic',
      },
    },
  ];

  buttons: Button[][] = [];

  criteriaList: CriteriaDto[] = [];
  fabricList: FabricDto[] = [];

  constructor(
    private dialog: MatDialog,
    private criteriaConnectorService: CriteriaConnectorService,
    private productConnectorService: ProductsConnectorService,
    private fabricConnectorService: FabricsConnectorService,
    private criteriaService: CriteriaService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.criteriaConnectorService.setApiUrl(data['apiUrl']);
    });
  }

  ngOnInit(): void {
    this.criteriaConnectorService.fetch().subscribe((data) => {
      this.criteriaList = [...data];

      this.fabricConnectorService.fetch().subscribe((data) => {
        this.fabricList = [...data];

        this.productConnectorService.fetch().subscribe((data) => {
          this.productData.next([
            ...data.map((p, i) => {
              let customerName = this.fabricList.filter(
                (f) => (f.code = p.fabricCode)
              )[0].customerName;

              this.buttons.push([
                {
                  title: '',
                  text: 'Gán tiêu chuẩn ',
                  icon: 'fa-plus',
                  iconColor: null,
                  action: () => {
                    this.onAddCriterion(i);
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
    });

    this.criteriaService.reloadSubject.subscribe(() => {
      this.ngOnInit();
    });
  }

  onCreateCriteria(): void {
    const dialog = this.dialog.open(CreateCriteriaDialogComponent);
  }

  onDeleteCriteria(i: number): void {
    const dialog = this.dialog.open(DeleteCriteriaDialogComponent, {
      data: { criteria: this.criteriaList[i] },
    });
  }

  onViewCriteria(i: number): void {
    const dialog = this.dialog.open(ViewCriteriaDialogComponent, {
      data: { criteria: this.criteriaList[i] },
    });
  }

  onAddCriterion(i: number): void {
    const dialog = this.dialog.open(AddCriteriaDialogComponent, {
      data: { criteria: this.criteriaList, product: this.productData.value[i] },
    });
  }
}
