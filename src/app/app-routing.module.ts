import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BrowseComponent } from './components/browse/browse.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGuard } from './services/auth.guard';
import { AnonymousService } from './services/anonymousservice.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousService] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomepageComponent },
      { path: 'books', component: BookComponent },
      { path: 'browse', component: BrowseComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'viewcart', component: ViewCartComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
