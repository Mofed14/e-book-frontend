import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookComponent } from './components/book/book.component';
import { BrowseComponent } from './components/browse/browse.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, BookComponent, BrowseComponent, LoginComponent, RegisterComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
     HttpClientModule,
     AppRoutingModule,
    
    ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
