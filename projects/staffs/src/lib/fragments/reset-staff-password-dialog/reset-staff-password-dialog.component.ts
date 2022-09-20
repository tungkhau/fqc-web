import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Staff } from '../../data/models/staff.model';
import { StaffsConnectorService } from '../../data/services/staff-connector.service';
import { StaffsService } from '../../staffs.service';

@Component({
  selector: 'epl-reset-staff-password-dialog',
  templateUrl: './reset-staff-password-dialog.component.html',
  styleUrls: ['./reset-staff-password-dialog.component.scss'],
})
export class ResetStaffPasswordDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialog,
    private staffConnectorService: StaffsConnectorService,
    private staffsService: StaffsService,
    @Inject(MAT_DIALOG_DATA) public data: { staff: Staff }
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onResetPassword() {
    this.staffConnectorService.patch(this.data.staff.id).subscribe((data) => {
      this.staffsService.reload();
    });
  }
}
