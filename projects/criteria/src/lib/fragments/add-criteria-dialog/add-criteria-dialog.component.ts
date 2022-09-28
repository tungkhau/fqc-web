import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriteriaService } from '../../criteria.service';
import { CriteriaDto } from '../../data/dtos/criteria-dto';
import { ProductDto } from '../../data/dtos/product-dto';
import { CriteriaConnectorService } from '../../data/services/criteria-connector.service';
import { ProductsConnectorService } from '../../data/services/products-connector.service';
import { DeleteCriteriaDialogComponent } from '../delete-criteria-dialog/delete-criteria-dialog.component';

@Component({
  selector: 'epl-add-criteria-dialog',
  templateUrl: './add-criteria-dialog.component.html',
  styleUrls: ['./add-criteria-dialog.component.scss'],
})
export class AddCriteriaDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.criteria }];
  headers: string[] = ['ID', 'TÊN TC'];
  attributes: string[] = ['id', 'name'];

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { criteria: CriteriaDto[]; product: ProductDto },
    private productsConnectorService: ProductsConnectorService,
    private criteriaService: CriteriaService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.data[0].grades?.map((g: any, i: number) => {
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

  chosenCriterionIndex = -1;

  onChooseCriterion(i: number) {
    this.chosenCriterionIndex = i;
  }

  chosenLabel = '';

  onChooseLabel(val: string) {
    this.chosenLabel = val;
  }

  onSubmit() {
    this.productsConnectorService
      .update(this.dialogData.product.id, {
        ...this.dialogData.product,
        criterionId: this.dialogData.criteria[this.chosenCriterionIndex].id,
        label: this.chosenLabel,
      })
      .subscribe((data) => {
        this.criteriaService.reload();
        if (data.result === 'OK') {
          this.onCloseDialog();
        }
      });
  }
}
