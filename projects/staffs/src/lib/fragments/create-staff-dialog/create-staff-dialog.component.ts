import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StaffDto } from '../../data/dtos/staff-dto';
import { StaffsConnectorService } from '../../data/services/staff-connector.service';
import { StaffsService } from '../../staffs.service';

@Component({
  selector: 'app-create-staff-dialog',
  templateUrl: './create-staff-dialog.component.html',
  styleUrls: ['./create-staff-dialog.component.scss'],
})
export class CreateStaffDialogComponent implements OnInit {
  createStaffForm = this.fb.group({
    code: '',
    name: '',
    role: 'STAFF',
  });

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private staffsConnectorService: StaffsConnectorService,
    private staffsService: StaffsService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onCreateStaff({ value }: { value: any }) {
    const submitStaff: StaffDto = {
      ...value,
    };

    this.staffsConnectorService.create(submitStaff).subscribe((data: any) => {
      console.log(data);
      this.staffsService.reload();
    });
  }
}
