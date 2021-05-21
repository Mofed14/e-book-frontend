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
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
 




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
    ViewCartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    Ng2SearchPipeModule,
    NzRateModule,
    NzEmptyModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NzBreadCrumbModule,
    NzBackTopModule,
    NzModalModule,
    NzMessageModule,
    NzResultModule,
    NzButtonModule,
    NzNotificationModule,
    
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class AppModule {}
