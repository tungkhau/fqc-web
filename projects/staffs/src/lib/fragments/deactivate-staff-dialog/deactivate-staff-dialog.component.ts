import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Staff } from '../../data/models/staff.model';
import { StaffsConnectorService } from '../../data/services/staff-connector.service';
import { StaffsService } from '../../staffs.service';

@Component({
  selector: 'epl-deactivate-staff-dialog',
  templateUrl: './deactivate-staff-dialog.component.html',
  styleUrls: ['./deactivate-staff-dialog.component.scss'],
})
export class DeactivateStaffDialogComponent implements OnInit {
  data: any[] = [{ code: '', name: '', role: '' }];
  headers: string[] = ['MÃ NHÂN VIÊN', 'TÊN NHÂN VIÊN', 'CHỨC VỤ'];
  attributes: string[] = ['code', 'name', 'role'];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { staff: Staff },
    private staffsConnectorService: StaffsConnectorService,
    private staffsService: StaffsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  toggleStaffActivation() {
    let newStaffDto = {
      ...this.dialogData.staff,
      active: !this.dialogData.staff.active,
    };

    this.staffsConnectorService
      .update(this.dialogData.staff.id, newStaffDto)
      .subscribe((data) => {
        this.staffsService.reload();
      });
  }
}
