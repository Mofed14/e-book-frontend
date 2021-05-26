import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  constructor(private wow: NgwWowService) {
    this.wow.init();
  }

  ngOnInit(): void {}
}
