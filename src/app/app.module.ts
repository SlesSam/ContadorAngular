import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContadorComponent } from './contador/contador.component';
import { PruebaCounterComponent } from './prueba-counter/prueba-counter.component';
import { PContadorComponent } from './pcontador/pcontador.component';
import { CounterServiceComponent } from './counter-service/counter-service.component';

@NgModule({
  declarations: [
    AppComponent,
    ContadorComponent,
    PruebaCounterComponent,
    PContadorComponent,
    CounterServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
