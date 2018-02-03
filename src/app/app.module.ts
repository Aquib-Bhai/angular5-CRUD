import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NatService } from './nat.service';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { NatComponent } from './nat/nat.component';


@NgModule({
  declarations: [
    AppComponent,
    NatComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [NatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
