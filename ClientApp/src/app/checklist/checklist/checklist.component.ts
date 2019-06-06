import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  imageUrl:string;
  isDone:true
  constructor() { }

  ngOnInit() {
    this.imageUrl=JSON.parse(localStorage.getItem("ImageUrl"));
  }
  commingsoon()
  {
    alert("This feature will be comming soon");
  }

}
