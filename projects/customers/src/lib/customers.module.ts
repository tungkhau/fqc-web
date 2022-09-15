import { NgModule } from '@angular/core';
import { AstModule } from 'ast-ast';
import { CustomersComponent } from './customers.component';
import { BackendService, CoreModule } from 'ast-core';
import { RouterModule } from '@angular/router';
import { CustomersConnectorService } from './data/services/customer-connector.service';
import { CreateCustomerDialogComponent } from './fragments/create-customer-dialog/create-customer-dialog.component';
import { EditCustomerDialogComponent } from './fragments/edit-customer-dialog/edit-customer-dialog.component';

const routes = [
  {
    path: '',
    component: CustomersComponent,
  },
];

@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomerDialogComponent,
    EditCustomerDialogComponent,
  ],
  providers: [BackendService, CustomersConnectorService],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [CustomersComponent, RouterModule],
})
export class CustomersModule {}
