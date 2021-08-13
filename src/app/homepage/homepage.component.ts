import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  menus: any = ['1','2','3','4','5','6','7','8','9','10'];
  constructor() { }

  ngOnInit(): void {
  }

}
