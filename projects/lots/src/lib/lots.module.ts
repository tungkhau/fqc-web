import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { LotsConnectorService } from './data/services/lots-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';
import { CreateLotDialogComponent } from './fragments/create-lot-dialog/create-lot-dialog.component';
import { DeleteLotDialogComponent } from './fragments/delete-lot-dialog/delete-lot-dialog.component';
import { LotsComponent } from './lots.component';

const routes = [
  {
    path: '',
    component: LotsComponent,
  },
];
@NgModule({
  declarations: [
    LotsComponent,
    CreateLotDialogComponent,
    DeleteLotDialogComponent,
  ],
  providers: [
    BackendService,
    ProductsConnectorService,
    FabricsConnectorService,
    LotsConnectorService,
  ],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [RouterModule, LotsComponent],
})
export class LotsModule {}
