import { Component, OnInit } from '@angular/core';
import {AuthService,SocialUser,FacebookLoginProvider,GoogleLoginProvider} from 'ng4-social-login';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent implements OnInit {

  title = 'app';
  public socialUser:any = SocialUser;
  public user:User = {id:'',email:'',name:'',type:'',phone:'',avatar:''};
  constructor(private service : AuthService,private userService:UserServiceService,private route:Router) { }

  ngOnInit() {
  }

  facebookLogin()
  {
    this.service.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData=>{
      this.socialUser=userData;
      this.user.id=userData.id;
      this.user.name=userData.name;
      this.user.email=userData.email;
      this.user.type="Facebook";
      this.user.phone='';
      localStorage.setItem("UserId",JSON.stringify(this.user.id));
      localStorage.setItem("Name",JSON.stringify(this.user.name));
      localStorage.setItem("ImageUrl",JSON.stringify(userData.photoUrl));
      this.userService.addUser(this.user).subscribe((res:any)=>{
        localStorage.setItem("Token",JSON.stringify(res.token));
      });
      this.route.navigateByUrl("/dashboard"); 
    });
  
    // this.user.id=this.socialUser.id;
    // this.user.name=this.socialUser.name;
    // this.user.email=this.socialUser.email;

  }
  googleLogin()
  { 
      this.service.signIn(GoogleLoginProvider.PROVIDER_ID).then(userData=>{
      this.socialUser=userData;
      this.user.id=userData.id;
      this.user.name=userData.name;
      this.user.email=userData.email;
      this.user.type="Google";
      this.user.phone='';
      localStorage.setItem("UserId",JSON.stringify(this.user.id));
      localStorage.setItem("Name",JSON.stringify(this.user.name));
    
      localStorage.setItem("ImageUrl",JSON.stringify(userData.photoUrl));
      this.userService.addUser(this.user).subscribe((res:any)=>{
        localStorage.setItem("Token",JSON.stringify(res.token));
      });
      this.route.navigateByUrl("/dashboard");
      console.log(userData);
      // id facebook : 2434567826771765
    });
  
  }


}
