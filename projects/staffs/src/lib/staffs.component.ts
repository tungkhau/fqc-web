import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { Staff } from './data/models/staff.model';
import { StaffsConnectorService } from './data/services/staff-connector.service';
import { CreateStaffDialogComponent } from './fragments/create-staff-dialog/create-staff-dialog.component';
import { StaffsService } from './staffs.service';

@Component({
  selector: 'epl-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent implements OnInit {
  staffData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  staffTableColumns: Column[] = [
    {
      name: 'code',
      header: 'MÃ NHÂN VIÊN',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'name',
      header: 'TÊN NHÂN VIÊN',
      width: '30%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'roleName',
      header: 'CHỨC VỤ',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'status',
      header: 'TRẠNG THÁI',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  buttons: Button[][] = [];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private staffConnectorService: StaffsConnectorService,
    private staffsService: StaffsService
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.staffConnectorService.setApiUrl(data['apiUrl']);
    });
  }

  ngOnInit(): void {
    this.staffConnectorService.fetch().subscribe((data) => {
      this.staffData.next(
        data.map((e, i) => {
          this.buttons.push([
            {
              title: '',
              text: 'Chỉnh sửa',
              icon: 'fa-pen-to-square',
              iconColor: null,
              action: () => {
                console.log('edit');
              },
            },
            {
              title: '',
              text: 'Reset password',
              icon: 'fa-lock',
              iconColor: null,
              action: () => {
                console.log('reset');
              },
            },
            {
              title: '',
              text: 'Vô hiệu hóa',
              icon: 'fa-power-off',
              iconColor: null,
              action: () => {
                this.onDeactivateStaff(i);
                console.log('deactivate');
              },
            },
          ]);

          return this.staffsService.parseDtoToModel(e);
        })
      );
    });

    this.staffsService.reloadStaffPage.subscribe((data) => {
      this.ngOnInit();
    });
  }

  onCreateStaff() {
    const dialogRef = this.dialog.open(CreateStaffDialogComponent);
  }

  onDeactivateStaff(i: number) {}
}
