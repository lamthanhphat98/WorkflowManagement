import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:string;
  priority:string[]=['1','2','3'];
  first:string[]=[];
  showTime:false;
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get("id");
    console.log(this.id);
    if(this.id===null)
    {
      this.first = this.priority.filter(f=>{
        return f.valueOf()==="1";
      });
      console.log(this.first);
      
    }
    else
    {
        console.log("OK");
    }
    // if(this.id!==NaN)
    // {
    //   console.log("OK");  

    // }
    // else
    // {
    //   this.first = this.priority.filter(f=>{
    //     return f.valueOf()==="1";
    //   });
    //   console.log(this.first);
    // }
  
 

  }

}
