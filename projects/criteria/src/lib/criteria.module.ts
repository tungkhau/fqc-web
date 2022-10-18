import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { CriteriaComponent } from './criteria.component';
import { CriteriaConnectorService } from './data/services/criteria-connector.service';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';
import { AddCriteriaDialogComponent } from './fragments/add-criteria-dialog/add-criteria-dialog.component';
import { CreateCriteriaDialogComponent } from './fragments/create-criteria-dialog/create-criteria-dialog.component';
import { DeleteCriteriaDialogComponent } from './fragments/delete-criteria-dialog/delete-criteria-dialog.component';
import { ViewCriteriaDialogComponent } from './fragments/view-criteria-dialog/view-criteria-dialog.component';
import { ViewLabelDialogComponent } from './fragments/view-label-dialog/view-label-dialog.component';

const routes = [
  {
    path: '',
    component: CriteriaComponent,
  },
];

@NgModule({
  declarations: [
    CriteriaComponent,
    CreateCriteriaDialogComponent,
    DeleteCriteriaDialogComponent,
    ViewCriteriaDialogComponent,
    AddCriteriaDialogComponent,
    ViewLabelDialogComponent,
  ],
  providers: [
    BackendService,
    CriteriaConnectorService,
    ProductsConnectorService,
    FabricsConnectorService,
  ],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [CriteriaComponent, RouterModule],
})
export class CriteriaModule {}
