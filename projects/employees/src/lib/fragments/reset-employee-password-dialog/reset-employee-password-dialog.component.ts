import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'epl-reset-employee-password-dialog',
  templateUrl: './reset-employee-password-dialog.component.html',
  styleUrls: ['./reset-employee-password-dialog.component.scss'],
})
export class ResetEmployeePasswordDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }
}
