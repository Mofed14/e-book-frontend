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
import { HomepageComponent } from './components/homepage/homepage.component';

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
<<<<<<< HEAD
      { path: '', component: HomepageComponent },
=======
      {path:'homepage',component:HomepageComponent},
>>>>>>> bbc08ed77b094e11e8812aaaaa6c9e92e239e421
      { path: 'books', component: BookComponent },
      { path: 'browse', component: BrowseComponent },
      { path: 'aboutus', component: AboutusComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
