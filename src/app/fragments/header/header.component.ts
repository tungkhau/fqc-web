import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'auth';

@Component({
  selector: 'app-header',
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

  user: any = {};

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((data) => {
      this.user = data;
    });
  }

  ngOnInit(): void {}
}
