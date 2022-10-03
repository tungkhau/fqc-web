import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { LotsConnectorService } from './data/services/lots-connector.service';
import { MeasurementsConnectorService } from './data/services/measurements-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';
import { AddMeasurementDialogComponent } from './fragments/add-measurement-dialog/add-measurement-dialog.component';
import { CreateLotDialogComponent } from './fragments/create-lot-dialog/create-lot-dialog.component';
import { DeleteLotDialogComponent } from './fragments/delete-lot-dialog/delete-lot-dialog.component';
import { DeleteMeasurementDialogComponent } from './fragments/delete-measurement-dialog copy/delete-measurement-dialog.component';
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
    AddMeasurementDialogComponent,
    DeleteMeasurementDialogComponent,
  ],
  providers: [
    BackendService,
    ProductsConnectorService,
    FabricsConnectorService,
    LotsConnectorService,
    MeasurementsConnectorService,
  ],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [RouterModule, LotsComponent],
})
export class LotsModule {}
