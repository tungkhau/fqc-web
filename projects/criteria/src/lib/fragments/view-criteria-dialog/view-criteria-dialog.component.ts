import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriteriaService } from '../../criteria.service';
import { CriteriaDto } from '../../data/dtos/criteria-dto';
import { CriteriaConnectorService } from '../../data/services/criteria-connector.service';
import { DeleteCriteriaDialogComponent } from '../delete-criteria-dialog/delete-criteria-dialog.component';

@Component({
  selector: 'epl-view-criteria-dialog',
  templateUrl: './view-criteria-dialog.component.html',
  styleUrls: ['./view-criteria-dialog.component.scss'],
})
export class ViewCriteriaDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.criteria }];
  headers: string[] = ['ID', 'TÊN TC'];
  attributes: string[] = ['id', 'name'];

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { criteria: CriteriaDto },
    private criteriaConnectorService: CriteriaConnectorService,
    private criteriaService: CriteriaService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.data[0].grades.map((g: any, i: number) => {
      this.headers.push(`LOẠI ${this.getAscii(i)}`);
      this.attributes.push(`type${i}`);
      this.data[0][`type${i}`] = `${
        i > 0 ? this.data[0].grades[i - 1].allowedPoint : 0
      } – ${g.allowedPoint}`;
      return g;
    });
  }

  getAscii(i: number) {
    return String.fromCodePoint(65 + i);
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  onDelete() {
    const dialog = this.dialog.open(DeleteCriteriaDialogComponent, {
      data: { criteria: this.dialogData.criteria },
    });
  }
}
