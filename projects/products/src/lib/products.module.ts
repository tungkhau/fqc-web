import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { ColorsConnectorService } from './data/services/colors-connector.service';
import { CustomersConnectorService } from './data/services/customers-connector.service';
import { CreateColorDialogComponent } from './fragments/create-color-dialog/create-color-dialog.component';
import { DeleteColorDialogComponent } from './fragments/delete-color-dialog/delete-color-dialog.component';
import { ProductsComponent } from './products.component';

const routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
  declarations: [
    ProductsComponent,
    CreateColorDialogComponent,
    DeleteColorDialogComponent,
  ],
  providers: [
    BackendService,
    ColorsConnectorService,
    CustomersConnectorService,
  ],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [ProductsComponent, RouterModule],
})
export class ProductsModule {}
