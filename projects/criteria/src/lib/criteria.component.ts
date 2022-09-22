import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { CriteriaService } from './criteria.service';
import { CriteriaDto } from './data/dtos/criteria-dto';
import { CriteriaConnectorService } from './data/services/criteria-connector.service';
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
      name: 'id',
      header: 'ID',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
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
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'customer',
      header: 'KHÁCH HÀNG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  buttons: Button[][] = [];

  criteriaList: CriteriaDto[] = [];

  constructor(
    private dialog: MatDialog,
    private criteriaConnectorService: CriteriaConnectorService,
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
}
