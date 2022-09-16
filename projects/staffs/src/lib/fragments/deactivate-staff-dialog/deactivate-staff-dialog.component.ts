import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'epl-deactivate-staff-dialog',
  templateUrl: './deactivate-staff-dialog.component.html',
  styleUrls: ['./deactivate-staff-dialog.component.scss'],
})
export class DeactivateStaffDialogComponent implements OnInit {
  data: any[] = [{ code: '', name: '', role: '' }];
  headers: string[] = ['MÃ NHÂN VIÊN', 'TÊN NHÂN VIÊN', 'CHỨC VỤ'];
  attributes: string[] = ['code', 'name', 'role'];

  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }
}
