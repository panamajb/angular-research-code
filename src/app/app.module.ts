import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlexLayoutComponent} from './arc-components/flex-layout/flex-layout.component';
import {ObservablesComponent} from './arc-components/observables/observables.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetterFn() {  return localStorage.getItem('token');}

@NgModule({
  declarations: [
    AppComponent,
    FlexLayoutComponent,
    ObservablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFn
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
