import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'auth-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.scss'],
})
export class AuthComponent implements OnInit {
  @Input() heading: string = '';
  @Input() subHeading: string = '';
  @Input() logoPath: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.heading = data['data'].heading;
      this.subHeading = data['data'].subHeading;
      this.logoPath = data['data'].logoPath;
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.authService.login();
    this.router.navigate(['main/products']);
  }
}
