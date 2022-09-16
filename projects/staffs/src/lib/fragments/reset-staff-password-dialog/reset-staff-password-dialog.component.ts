import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'epl-reset-staff-password-dialog',
  templateUrl: './reset-staff-password-dialog.component.html',
  styleUrls: ['./reset-staff-password-dialog.component.scss'],
})
export class ResetStaffPasswordDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }
}
