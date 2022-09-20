import { NgModule } from '@angular/core';
import { AstModule } from 'ast';
import { CustomersComponent } from './customers.component';
import { BackendService, CoreModule } from 'core';
import { RouterModule } from '@angular/router';
import { CustomersConnectorService } from './data/services/customer-connector.service';
import { CreateCustomerDialogComponent } from './fragments/create-customer-dialog/create-customer-dialog.component';
import { EditCustomerDialogComponent } from './fragments/edit-customer-dialog/edit-customer-dialog.component';
import { DeleteCustomerDialogComponent } from './fragments/delete-customer-dialog/delete-customer-dialog.component';

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
    DeleteCustomerDialogComponent,
  ],
  providers: [BackendService, CustomersConnectorService],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [CustomersComponent, RouterModule],
})
export class CustomersModule {}
