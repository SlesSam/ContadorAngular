import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContadorComponent } from './contador/contador.component';
import { PruebaCounterComponent } from './prueba-counter/prueba-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    ContadorComponent,
    PruebaCounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
