import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import {HttpClientModule} from  '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import {SocialLoginModule,FacebookLoginProvider,GoogleLoginProvider, AuthServiceConfig} from 'ng4-social-login';
import { TestComponent } from './test/test/test.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CreateformComponent } from './form/createform/createform.component';
import { ActivityComponent } from './activity/activity/activity.component';
import { MemberComponent } from './member/member/member.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { NeworganizationComponent } from './organization/neworganization/neworganization.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification/notification/notification.component';
import { ChecklistComponent } from './checklist/checklist/checklist.component';
import { EditComponent } from './checklist/edit/edit.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TemplateComponent } from './checklist/template/template.component';
import { ChecklistResolverService } from './service/checklist-resolver.service';
import { ChecklistDetailResolverService } from './service/checklistdetail-resolver.service';
import { GetAllChecklistResolver } from './service/getallchecklist-resolver.service';
import { CurrentOrganizationResolver } from './service/current-organization-resolver.service';



const  config = new  AuthServiceConfig([
{
  id:FacebookLoginProvider.PROVIDER_ID,
  provider : new FacebookLoginProvider("588230448295444")
},
{
  id:GoogleLoginProvider.PROVIDER_ID,
  provider : new GoogleLoginProvider("723570772487-cd22uab512218e5mgkn7a6j59kmkpc38.apps.googleusercontent.com")
}
],false);

const routes :Routes = [
  {
    path:"",component:LoginComponent
  },
  {
    path:'test',component:TestComponent
  },
  {
    path:"login",component:LoginComponent
  },
  {
    path:"home",component:HomeComponent,resolve:{dashboard:CurrentOrganizationResolver}
  },
  {
    path:"dashboard",component:DashboardComponent,resolve:{dashboard:GetAllChecklistResolver}
  },
  {
    path:"form",component:CreateformComponent
  },
  {
    path:"activity",component:ActivityComponent
  },
  {
    path:"member",component:MemberComponent
  },
  {
    path:"organization",component:OrganizationComponent
  },
  {
    path:"notification",component:NotificationComponent
  }
  ,
  {
    path:"checklist",component:ChecklistComponent
  } ,
  {
    path:"checklist/:id",component:ChecklistComponent,resolve:{checklist:ChecklistDetailResolverService}
  } ,
  {
    path:"checklist/:id/:taskid",component:ChecklistComponent,resolve:{checklist:ChecklistDetailResolverService}
  } ,
  {
    path:"edit/:id",component:EditComponent,resolve:{template:ChecklistResolverService}
  } ,
  {
    path:"edit",component:EditComponent
  },
  {
    path:"edit/:id/:taskid",component:EditComponent,resolve:{template:ChecklistResolverService}
  }
   ,
  {
    path:"template",component:TemplateComponent
  },
  {
    path:"template/:id",component:TemplateComponent
  }
]
export function providerConfig()
{
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    HomeComponent,
    DashboardComponent,
    CreateformComponent,
    ActivityComponent,
    MemberComponent,
    OrganizationComponent,
    NeworganizationComponent,
    NotificationComponent,
    ChecklistComponent,
    EditComponent,
    TemplateComponent,

  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    FormsModule, 
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ],
  entryComponents:[NeworganizationComponent],
  providers: [{provide:AuthServiceConfig,useFactory:providerConfig},ChecklistResolverService,ChecklistDetailResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
