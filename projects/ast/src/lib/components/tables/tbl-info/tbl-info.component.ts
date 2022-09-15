import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ast-tbl-info',
  templateUrl: './tbl-info.component.html',
  styleUrls: ['./tbl-info.component.scss'],
})
export class TblInfoComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];
  @Input() attributes: string[] = [];
  @Input() headerWidth: string = 'auto';
  @Input() dataWidth: string = '80%';

  constructor() {}

  ngOnInit(): void {}
}
