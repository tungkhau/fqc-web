import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AstModule } from 'ast';
import { BackendService, CoreModule } from 'core';
import { StaffsConnectorService } from './data/services/staff-connector.service';
import { StaffsComponent } from './staffs.component';
import { ResetStaffPasswordDialogComponent } from './fragments/reset-staff-password-dialog/reset-staff-password-dialog.component';
import { CreateStaffDialogComponent } from './fragments/create-staff-dialog/create-staff-dialog.component';
import { DeactivateStaffDialogComponent } from './fragments/deactivate-staff-dialog/deactivate-staff-dialog.component';

const routes = [
  {
    path: '',
    component: StaffsComponent,
  },
];

@NgModule({
  declarations: [
    StaffsComponent,
    CreateStaffDialogComponent,
    ResetStaffPasswordDialogComponent,
    DeactivateStaffDialogComponent,
  ],
  providers: [BackendService, StaffsConnectorService],
  imports: [AstModule, RouterModule.forChild(routes), CoreModule],
  exports: [StaffsComponent, RouterModule],
})
export class StaffsModule {}
