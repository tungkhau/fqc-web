import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomerAPIResolver } from './customer-api-resolver';
import { AstModule } from 'ast-ast';
import { ToastModule } from 'ast-core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AstModule,
    AppRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,

    ToastModule,
  ],
  providers: [CustomerAPIResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
