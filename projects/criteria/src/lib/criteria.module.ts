import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { CriteriaComponent } from './criteria.component';
import { CriteriaConnectorService } from './data/services/criteria-connector.service';
import { CreateCriteriaDialogComponent } from './fragments/create-criteria-dialog/create-criteria-dialog.component';

const routes = [
  {
    path: '',
    component: CriteriaComponent,
  },
];

@NgModule({
  declarations: [CriteriaComponent, CreateCriteriaDialogComponent],
  providers: [BackendService, CriteriaConnectorService],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [CriteriaComponent, RouterModule],
})
export class CriteriaModule {}
