import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriteriaService } from '../../criteria.service';
import { CriteriaDto } from '../../data/dtos/criteria-dto';
import { CriteriaConnectorService } from '../../data/services/criteria-connector.service';

@Component({
  selector: 'epl-delete-criteria-dialog',
  templateUrl: './delete-criteria-dialog.component.html',
  styleUrls: ['./delete-criteria-dialog.component.scss'],
})
export class DeleteCriteriaDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.criteria }];
  headers: string[] = ['ID', 'TÊN TC'];
  attributes: string[] = ['id', 'name'];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { criteria: CriteriaDto },
    private criteriaConnectorService: CriteriaConnectorService,
    private criteriaService: CriteriaService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onDelete() {
    if (this.dialogData.criteria.id)
      this.criteriaConnectorService
        .delete(this.dialogData.criteria.id)
        .subscribe((data) => {
          this.criteriaService.reload();
        });
  }
}
