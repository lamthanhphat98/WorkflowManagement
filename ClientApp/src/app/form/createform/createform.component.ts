import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormCategory } from 'src/app/model/formcategory';
import { HttpClient } from '@angular/common/http';
import { FormcategoryService } from 'src/app/service/formcategory.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit {

  imageUpload:File;
  imageName:string;
  imageUrl:string = "/assets/img/baotrung.jpg";
  base64url:string;
  
  getImage:any [] = [];
  constructor(private formService:FormcategoryService,private domSanitizer :DomSanitizer ) { }

  formcategory:FormCategory;
  ngOnInit() {
    
    this.formcategory={
      id:0,
      title:'',
      image:null,
      url:'',
      type:''
    }
    this.loadImage();
    
  
  }
  loadImage()
  {
    this.formService.getImage().then((res:any)=>{
      this.getImage = res;
     // console.log(this.getImage);
      this.imageUrl = 'data:image/*;base64,'+this.getImage;
    })
  }
  chooseImage(file:FileList)
  {
    
   this.imageUpload=file.item(0);
   
   var reader = new FileReader();
   reader.onload=(event:any)=>
   {
     this.imageUrl=event.target.result;
     
   };
 
   reader.readAsDataURL(this.imageUpload);
 
  }
  onSubmit(form:NgForm)
  {
    console.log(form.value);
    const { Title, Type, Url } = form.value;
    const formData = new FormData();

    formData.append('title', Title);
    formData.append('type', Type);
    formData.append('url', Url);

    formData.append('File', this.imageUpload);
    console.log(this.imageUpload);

    // console.log(formData.entries());

    this.formService.post(formData).toPromise()
    .then(res => console.log(res))
    .catch(err => console.log(err));    
    // console.log(this.imageUrl);


//     this.convertImageToBinaryString(this.imageUrl,(dataUrl) =>{
//       this.base64url=dataUrl;
//       console.log(dataUrl);
// });
  }




  // convertImageToBinaryString(src,callback)
  // {
  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onload = function()
  //   {
  //     var reader = new FileReader();
  //     reader.onloadend = function()
  //     {
  //       callback(reader.result);
  //       console.log(callback);
  //     };
  //     reader.readAsDataURL(xhttp.response);
  //   };
  //   xhttp.responseType="blob";
  //   xhttp.open('GET',src,true);
  //   xhttp.send();

  // }

}
