import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { Staff } from './data/models/staff.model';
import { StaffsConnectorService } from './data/services/staff-connector.service';
import { CreateStaffDialogComponent } from './fragments/create-staff-dialog/create-staff-dialog.component';
import { EditStaffDialogComponent } from './fragments/edit-staff-dialog/edit-staff-dialog.component';
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
                this.onEditStaff(i);
              },
            },
            {
              title: '',
              text: 'Reset password',
              icon: 'fa-lock',
              iconColor: null,
              action: () => {
                this.onResetPassword(i);
              },
            },
            {
              title: '',
              text: 'Vô hiệu hóa',
              icon: 'fa-power-off',
              iconColor: null,
              action: () => {
                this.toggleStaffActivation(i);
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

  onEditStaff(i: number) {
    const dialogRef = this.dialog.open(EditStaffDialogComponent, {
      data: { staff: this.staffData.getValue()[i] },
    });
  }

  toggleStaffActivation(i: number) {
    let newStaffDto = {
      ...this.staffData.getValue()[i],
      active: !this.staffData.getValue()[i].active,
    };

    this.staffConnectorService
      .update(this.staffData.getValue()[i].id, newStaffDto)
      .subscribe((data) => {
        this.staffsService.reload();
      });
  }

  onResetPassword(i: number) {
    this.staffConnectorService
      .patch(this.staffData.getValue()[i].id)
      .subscribe((data) => {
        this.staffsService.reload();
      });
  }
}
