import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

logo = '../assets/images/logo.png';
 
// toggle in the small screens
  isOpen :boolean=false;

  toggleNavbar(){
    this.isOpen = !this.isOpen
  }

  constructor() { }

  

  ngOnInit(): void {
  }

}
