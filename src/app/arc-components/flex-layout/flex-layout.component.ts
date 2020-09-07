import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../arc-services/auth.service';

@Component({
  selector: 'arc-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.scss']
})
export class FlexLayoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  authenticate() {
    this.authService.login({username: 'panamajb', password: 'panama1'});
   }

  getResource() {
    this.authService.getResource();
  }
}
