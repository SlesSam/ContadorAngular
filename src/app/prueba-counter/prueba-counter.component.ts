import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { interval,   NEVER,   of,   Subject } from 'rxjs';
import { map,startWith, scan, tap,switchMap, catchError, } from 'rxjs/operators'
@Component({
  selector: 'app-prueba-counter',
  templateUrl: './prueba-counter.component.html',
  styleUrls: ['./prueba-counter.component.css']
})
export class PruebaCounterComponent implements OnInit {
  @ViewChild('counte', {read: ElementRef,static:true})
  
  counter!: ElementRef;

  ver:any;

  set: FormControl = new FormControl();

incremento: FormControl = new FormControl();

constructor(){
  this.set.valueChanges.subscribe(y =>{  
    this.counter.nativeElement.innerText= y
    ,console.log(y) });
  this.incremento.valueChanges.subscribe(x =>{ 
    console.log(x), 
    this.counter.nativeElement.innerText = x });


}
//Subject nos permite que sea 'multicasted' mas que un observable
  private counteSubje: Subject<{pause?:boolean, counterValue?: any, increment?: any, countUp?:boolean}>= new Subject();


  ngOnInit(): void {
    this.initializeCounter();
    // this.counterInit();

  }

  initializeCounter(){
    console.log('holaaaa iniciar');
    
    this.counteSubje.pipe(
          startWith({pause: true, counterValue: 0, increment: 2, countUp:true}), //es para empezar el contador 
          scan((acc, value)=>({...acc,...value})), 
          tap((state)=>{
            this.counter.nativeElement.innerText = state.counterValue;}),
          switchMap(  (state)=> state.pause ? NEVER : interval(1000).pipe(
            tap(v=>{

              state.counterValue++ 
              this.counter.nativeElement.innerText = state.counterValue;
              console.log(state.counterValue)

              

            })
          )), catchError(v => of(`I caught: ${v}`))
          
          ).subscribe(x => console.log(x));

  }


  start(){
    this.counteSubje.next({pause:false})
    console.log('Se inicia el conteo');
    
  }

  pause(){
    this.counteSubje.next({pause:true})
    console.log( 'Se pausa');
    
  }

  reset(){
    this.counteSubje.next({counterValue:0})
    console.log('Desde cerooo')
  }

  countUp(){
   
    this.counteSubje.next({ countUp: true})
    console.log('Cuenta progresiva')
  }

  countDown(){

    this.counteSubje.next({countUp: false})
    console.log('Cuenta regresiva')
  }



}
