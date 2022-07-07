import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, NEVER, of, scan, startWith, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators'
@Component({
  selector: 'app-prueba-counter',
  templateUrl: './prueba-counter.component.html',
  styleUrls: ['./prueba-counter.component.css']
})
export class PruebaCounterComponent implements OnInit {
  @ViewChild('counte', {read: ElementRef,static:true})
  // @ViewChild('set', {read: ElementRef,static:true})
  // @ViewChild('incrementoo', {read: ElementRef,static:true})
  // value= document.getElementById('id');

  // set!: ElementRef;
  // incrementoo!:ElementRef;
  counter!: ElementRef;
//Subject nos permite que sea 'multicasted' mas que un observable
  private counteSubje: Subject<{pause?:boolean, counterValue?: any, increment?: any, countUp?:boolean}>= new Subject();


  constructor() { }

  ngOnInit(): void {
    this.initializeCounter();
    // this.counterInit();

  }

  initializeCounter(){
    console.log('holaaaa iniciar');
    
    this.counteSubje.pipe(
          startWith({pause: true, counterValue: 0}), //es para empezar el contador 
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


  counterInit(){
    this.counteSubje.pipe(
      startWith({
        pause: true, 
        counterValue: 0,
        increment: 1,
        countUp:true}), 
        scan((acc, val)=>({...acc,...val})),
        tap((mapp)=>this.counter.nativeElement.innerText = mapp.counterValue),
        switchMap((stae)=>
        stae.countUp 
        ?  interval(1000).pipe(
            tap(
              ()=>(stae.counterValue+= stae.countUp ? stae.increment : -stae.increment)
            ),
            tap(()=>this.counter.nativeElement.innerText = stae.counterValue)

          ) 
        : NEVER
        ) 
        
    ).subscribe();
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
    this.counteSubje.next({countUp: false})
    console.log('Cuenta progresiva')
  }

  countDown(){
    this.counteSubje.next({countUp: true})
    console.log('Cuenta regresiva')
  }
}
