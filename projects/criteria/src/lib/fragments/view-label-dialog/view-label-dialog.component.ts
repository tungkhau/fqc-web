import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'epl-view-label-dialog',
  templateUrl: './view-label-dialog.component.html',
  styleUrls: ['./view-label-dialog.component.scss'],
})
export class ViewLabelDialogComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { image: number }
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialog.closeAll();
  }
}
