import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MybookingComponent } from './mybooking/mybooking.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PackageComponent } from './property/package/package.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  {path:'',component: PropertyListComponent},
  {path:'property-detail/:id',component:PropertyDetailComponent},
  {path:'add-property',component:AddPropertyComponent, canActivate:[AuthGuard]},
  {path:'myBooking',component:MybookingComponent},
  {path:'package',component:PackageComponent},
  {path:'user/login',component:UserLoginComponent},
  {path:'user/register',component:UserRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
