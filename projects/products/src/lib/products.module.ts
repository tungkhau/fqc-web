import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { ProductsComponent } from './products.component';

const routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

@NgModule({
  declarations: [ProductsComponent],
  providers: [BackendService],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [ProductsComponent, RouterModule],
})
export class ProductsModule {}
