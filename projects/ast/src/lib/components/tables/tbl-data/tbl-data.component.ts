import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Button } from '../../../interfaces/Button';
import { Column } from '../../../interfaces/Column';

@Component({
  selector: 'ast-tbl-data',
  templateUrl: './tbl-data.component.html',
  styleUrls: ['./tbl-data.component.scss'],
})
export class TblDataComponent implements OnInit {
  @Input() data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @Input() columns: Column[] = [];
  @Input() buttons: Button[][] = [];
  @Input() pageSizeOptions: number[] = [7, 50, 100];

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];

  filter: {
    order: number;
    list: {
      name: string | null;
      isActive: boolean;
      isChecked: boolean;
    }[];
  }[] = [];

  filterChanged = new Subject<
    {
      order: number;
      list: {
        name: string | null;
        isActive: boolean;
        isChecked: boolean;
      }[];
    }[]
  >();

  lastFilterOrder: number = 0;

  sortState: boolean[] = [];
  currentSortColumn: number = 0;

  isShowFilterBox: boolean[] = [];

  pageSize = 10;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @ts-ignore
  pageEvent: PageEvent;

  constructor() {}

  ngOnInit(): void {
    this.data.subscribe((data) => {
      this.dataSource.data = data.slice();
      this.dataSource.data = this.dataSource.data.map((row, i) => ({
        index: i + 1,
        ...row,
      }));

      this.displayedColumns = [
        'index',
        ...this.columns.map((c) => c.name),
        'actions',
      ];

      this.columns
        .map((c) => c.name)
        .map(() => this.isShowFilterBox.push(false));
      this.columns.map((c) => c.name).map(() => this.sortState.push(true));

      this.columns
        .map((c) => c.name)
        .map((col, i) => {
          let list: {
            name: string;
            isActive: boolean;
            isChecked: boolean;
          }[] = [];

          data.map((row) => {
            if (list.map((k) => k.name).indexOf(row[col]) < 0)
              list.push({ name: row[col], isActive: true, isChecked: true });
          });

          this.filter[i] = {
            order: 0,
            list,
          };
        });

      this.filterChanged.subscribe((filter) => {
        console.log(this.lastFilterOrder);
        
        // Reset isActive
        for (let k = 0; k < filter.length; ++k) {
          if (filter[k]) {
            filter[k].list = filter[k].list.map((x) => ({
              ...x,
              isActive: true,
            }));
          }
        }

        this.dataSource.data = this.data.getValue();
        
        for (let i = 1; i <= this.lastFilterOrder; ++i) {
          for (let j = 0; j < filter.length; ++j) {
            if (filter[j] && filter[j].order == i) {
              // Filter data
              let key = this.columns[j].name;
              this.dataSource.data = this.dataSource.data.filter((c) => {
                return (
                  filter[j].list
                    .filter((f) => f.isActive && f.isChecked)
                    .map((f) => f.name)
                    .indexOf(c[key]) >= 0
                );
              });
              console.log(i);
              console.log(j);
              
              console.log(this.dataSource.data);
              
              
              // Update isActive
              for (let k = 0; k < filter.length; ++k) {
                if (
                  k !== j &&
                  filter[k] &&
                  (filter[k].order > filter[j].order || filter[k].order == 0)
                ) {
                  
                  
                  filter[k].list = filter[k].list.map((x) => ({
                    ...x,
                    isActive: false,
                  }));
                  let keyy = this.columns[k].name;
                  this.dataSource.data.map((c) => {
                    filter[k].list.map((x) => {
                      if (x.name === c[keyy]) x.isActive = true;
                    });
                  });

                  console.log(filter);
                }
              }
            }
          }
        }

        this.dataSource.data = this.dataSource.data.map((row, i) => ({
          ...row,
          index: i + 1,
        }));
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  toggleFilterBox(col: number) {
    this.isShowFilterBox[col] = !this.isShowFilterBox[col];
  }

  toggleFilterOption(col: number, row: number) {
    this.filter[col].list[row].isChecked =
      !this.filter[col].list[row].isChecked;
  }

  applyFilter(column: number) {
    // Update order number
    let num = this.filter[column].list.reduce((pre, x) => {
      if (x.isChecked) return pre + 1;
      else return pre;
    }, 0);

    if (this.filter[column].order == 0) {
      if (num < this.filter[column].list.length)
        this.filter[column].order = ++this.lastFilterOrder;
    } else {
      if (num == this.filter[column].list.length) {
        for (let k = 0; k < this.filter.length; ++k) {
          if (
            this.filter[k] &&
            this.filter[k].order > this.filter[column].order
          ) {
            console.log(this.filter[k].order);
            this.filter[k].order = this.filter[k].order - 1;
          }
        }

        this.lastFilterOrder--;
        this.filter[column].order = 0;
      }
    }

    // Update filtered table
    this.dataSource.data = [...this.data.getValue()];
    this.filterChanged.next(this.filter);

    // Hide all filter boxes
    this.isShowFilterBox = this.isShowFilterBox.map((x) => false);

    // Sort
    this.sortState[this.currentSortColumn] =
      !this.sortState[this.currentSortColumn];
    this.sortByColumn(this.currentSortColumn);
  }

  sortByColumn(i: number) {
    this.currentSortColumn = i;

    if (this.sortState[i]) {
      this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
        if (a[this.columns[i].name] < b[this.columns[i].name]) return -1;
        if (a[this.columns[i].name] > b[this.columns[i].name]) return 1;
        return 0;
      });
    } else {
      this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
        if (a[this.columns[i].name] < b[this.columns[i].name]) return 1;
        if (a[this.columns[i].name] > b[this.columns[i].name]) return -1;
        return 0;
      });
    }

    this.dataSource.data = this.dataSource.data.map((row, i) => ({
      ...row,
      index: i + 1,
    }));

    this.sortState[i] = !this.sortState[i];

    this.isShowFilterBox[i] = false;
  }
}
