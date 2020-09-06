import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlexLayoutComponent} from './arc-components/flex-layout/flex-layout.component';
import {ObservablesComponent} from './arc-components/observables/observables.component';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    FlexLayoutComponent,
    ObservablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
