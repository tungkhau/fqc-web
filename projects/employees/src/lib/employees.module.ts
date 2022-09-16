import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { EmployeesConnectorService } from './data/services/employee-connector.service';
import { EmployeesComponent } from './employees.component';

const routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
];

@NgModule({
  declarations: [EmployeesComponent],
  providers: [BackendService, EmployeesConnectorService],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [EmployeesComponent, RouterModule],
})
export class EmployeesModule {}
