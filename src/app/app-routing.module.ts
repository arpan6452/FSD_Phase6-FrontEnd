import { AuthGuardService } from './common/auth-guard.service';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CartComponent } from './cart/cart.component';
import { MenupageComponent } from './menupage/menupage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: MenupageComponent },
  // { path: 'homePage', component: HomepageComponent },
  { path: 'menuPage', component: MenupageComponent },
  { path: 'review', component: ReviewComponent, canActivate: [AuthGuardService] },
  { path: 'cartPage', component: CartComponent , canActivate: [AuthGuardService]},
  { path: 'adminPage', component: AdminPageComponent , canActivate: [AuthGuardService]},
    // otherwise redirect to home
  { path: '**', redirectTo: 'MenupageComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
