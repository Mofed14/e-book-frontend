import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { BrowseComponent } from './components/browse/browse.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
<<<<<<< HEAD
import { NzRateModule } from 'ng-zorro-antd/rate';
=======
<<<<<<< HEAD

=======
<<<<<<< HEAD
import { NzRateModule } from 'ng-zorro-antd/rate';
=======
>>>>>>> 65961515c336b3aab616fdf4b01855fed38a3f7c
>>>>>>> 9acd4c1779943ad091a3228a62db2f4f63fd8dbc
>>>>>>> 98069324577e86206e5ae3bb518cb7970c0a3b82
>>>>>>> 9a2c4cf4d36324f5c121e863620ea41de9069bf6

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookComponent,
    BrowseComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    HomepageComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    Ng2SearchPipeModule,
    NzRateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
