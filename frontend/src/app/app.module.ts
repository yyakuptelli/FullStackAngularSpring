import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductAddComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'products', pathMatch: "full"},
      {path: 'products', component: ProductsComponent},
      {path: 'product-add', component: ProductAddComponent},
      {path: 'product-edit/:id', component: ProductEditComponent},
      {path: 'product-detail/:id', component: ProductDetailComponent},
    ]),
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
