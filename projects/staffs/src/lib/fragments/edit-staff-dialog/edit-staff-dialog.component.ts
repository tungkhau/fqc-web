import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffDto } from '../../data/dtos/staff-dto';
import { Staff } from '../../data/models/staff.model';
import { StaffsConnectorService } from '../../data/services/staff-connector.service';
import { StaffsService } from '../../staffs.service';

@Component({
  selector: 'app-edit-staff-dialog',
  templateUrl: './edit-staff-dialog.component.html',
  styleUrls: ['./edit-staff-dialog.component.scss'],
})
export class EditStaffDialogComponent implements OnInit {
  editStaffForm = this.fb.group({
    code: this.data.staff.code,
    name: this.data.staff.name,
    role: this.data.staff.role,
    active: this.data.staff.active,
  });

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { staff: Staff },
    private fb: FormBuilder,
    private staffsConnectorService: StaffsConnectorService,
    private staffsService: StaffsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onUpdateStaff({ value }: { value: any }) {
    const submitStaff: StaffDto = {
      ...value,
    };

    console.log(this.data.staff);

    this.staffsConnectorService
      .update(this.data.staff.id, submitStaff)
      .subscribe((data: any) => {
        this.staffsService.reload();
        if (data.result === 'OK') this.onCloseDialog();
      });
  }
}
