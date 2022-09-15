import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ast-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() logoPath: string | null = '';
  @Input() brandText: string | null = '';
  @Input() brandTextColor: string | null = '';
  @Input() routes: {
    icon: string | null;
    text: string | null;
    path: string;
  }[] = [];

  constructor() {}

  ngOnInit(): void {}
}
