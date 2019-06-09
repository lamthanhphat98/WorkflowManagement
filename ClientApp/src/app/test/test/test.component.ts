import { Component, OnInit } from '@angular/core';
import { model } from 'src/app/model/checklist';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  checkList: model[];
   UserId:string;
  constructor() { 
  
    this.UserId = localStorage.getItem("UserId").toString();
  }

  ngOnInit() {
    this.checkList = [
      {id:0,src:'',text:'def',type:''}
    ];
  }

  addImage(){
    
    var id =this.checkList.length-1;
    var model:model = {id:id++,src:'/assets/img/default-2.jpg',type:'image',text:''};
    this.checkList.push(model);
  }

  addInput(){
    var id =this.checkList.length-1;
    
    var model:model = {id:id++,src:'',type:'input', text:'abc'};
    this.checkList.push(model);
  }

}
