import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { ColorsConnectorService } from './data/services/colors-connector.service';
import { CustomersConnectorService } from './data/services/customers-connector.service';
import { FabricsConnectorService } from './data/services/fabrics-connector.service';
import { ProductsConnectorService } from './data/services/products-connector.service';
import { CreateColorDialogComponent } from './fragments/create-color-dialog/create-color-dialog.component';
import { CreateFabricDialogComponent } from './fragments/create-fabric-dialog/create-fabric-dialog.component';
import { CreateProductDialogComponent } from './fragments/create-product-dialog/create-product-dialog.component';
import { DeleteColorDialogComponent } from './fragments/delete-color-dialog/delete-color-dialog.component';
import { DeleteFabricDialogComponent } from './fragments/delete-fabric-dialog/delete-fabric-dialog.component';
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
    CreateFabricDialogComponent,
    DeleteFabricDialogComponent,
    CreateProductDialogComponent,
  ],
  providers: [
    BackendService,
    ColorsConnectorService,
    CustomersConnectorService,
    FabricsConnectorService,
    ProductsConnectorService,
  ],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [ProductsComponent, RouterModule],
})
export class ProductsModule {}
