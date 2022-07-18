import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { interval, NEVER, of, scan, startWith, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators'

@Component({
  selector: 'app-pcontador',
  templateUrl: './pcontador.component.html',
  styleUrls: ['./pcontador.component.css']
})
export class PContadorComponent implements OnInit {

  @ViewChild('counte', {read: ElementRef,static:true}) counter!: ElementRef;
  @Output() sendValueSet = new EventEmitter<number>();


  sey = document.getElementById('set');
  @ViewChild('set', {read: ElementRef,static:true}) set!:ElementRef;
  
//Subject nos permite que sea 'multicasted' mas que un observable
  private counteSubje: Subject<{pause?:boolean, counterValue?: any, increment?: any, countUp?:boolean}>= new Subject();
  private counteSubjeq: Subject<{pause?:boolean, counterValue?: any, increment?: any, countUp?:boolean}>= new Subject();

 
  // setValue = ()=>{
        
  //   console.log(this.sey+ ' ?¿? '+ this.set.nativeElement.value);
  //   this.sendValueSet,emit(this.set.nativeElement.value)


  // }

  constructor() { }

  ngOnInit(): void {
    this.initializeCounter();
    // this.counterInit();
    // this.setValue();

  }

  initializeCounter(){
    console.log('holaaaa iniciar');
    
    this.counteSubje.pipe(
          startWith({pause: true, counterValue: 10, countUp:true}), //es para empezar el contador 
          scan((acc, value)=>({...acc,...value})), 
          tap((state)=>{ 
            this.counter.nativeElement.innerText = state.counterValue;
            // this.setValue(state.counterValue)
          
          }),
          switchMap(  (state)=> state.pause ? NEVER : interval(1000).pipe(
            tap(v=>{
              // this.counter.nativeElement.innerText = state.counterValue ?  state.counterValue++: state.counterValue--
              state.counterValue--;

              this.counter.nativeElement.innerText = state.counterValue;
              console.log(state.counterValue +' dentro init')

              

            })

            
          )), catchError(v => of(`I caught: ${v}`))
          
          ).subscribe(x => console.log(x + ' en el subcro'));

  }


  counterInit(){
    this.counteSubjeq.pipe(
      startWith({
        pause: true, 
        counterValue: 0,
        increment: 1,
        countUp:true}), 
        scan((acc, val)=>({...acc,...val})),
        tap((mapp)=>this.counter.nativeElement.innerText = mapp.counterValue),
        switchMap((stae)=>
        stae.pause 
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

  countUp(up= 'up'){
    this.counteSubje.next({countUp:true})

    if(up){

      this.counter.nativeElement.innerText++;

      console.log(up);
      
    }else{
      console.log('no va ir up ');
      
    }

    
    // this.counter+= this.counteSubje.next({counterValue:1})
    // this.counter++;
    console.log('Cuenta progresiva')
  }

  countDown(){
    this.counteSubje.next({ countUp: false})
    console.log('Cuenta regresiva')
  }

}

/*
 // @ViewChild('counte', {static:true,}) counter!: ElementRef;
  // @ViewChild('incrementoo', {read: ElementRef,static:true}) increment!: ElementRef;
   @ViewChild('set') setTo!: ElementRef;    

  counte!:number;
  
//Subject nos permite que sea 'multicasted' mas que un observable
  private counteSubje: Subject<{pause?:boolean, counterValue?: any, increment?: any, countUp?:boolean}>= new Subject();

  constructor() { }

  ngOnInit(): void {
    // this.initializeCounter();
    this.counterInit();
    // this.setValue();

  }

  initializeCounter(){
    console.log('holaaaa iniciar');
    
    this.counteSubje.pipe(
          startWith({pause: true, counterValue: 10, countUp:true}), //es para empezar el contador 
          scan((acc, value)=>({...acc,...value})), 
          tap((state)=>{ 
            this.counte = state.counterValue;
            // this.setValue(state.counterValue)
          
          }),
          switchMap(  (state)=> state.pause ? NEVER : interval(1000).pipe(
            tap(v=>{
              // this.counter.nativeElement.innerText = state.counterValue ?  state.counterValue++: state.counterValue--
              state.counterValue++;

              // this.counter.nativeElement.innerText = state.counterValue;
              console.log(state.counterValue +' dentro init')

              

            })

            
          )), catchError(v => of(`I caught: ${v}`))
          
          ).subscribe(x => console.log(x + ' en el subcro'));

  }

  private Prueba: Subject<{pause: boolean, counterV:any, upDown:boolean, increment:any}> = new Subject();
  
  
  private counteSubjeqPrueba: Subject<{pause?:boolean, counterValue?: any, increment?: any, countUp?:boolean}>= new Subject();

  h = document.getElementById('set');
  ke = document.getElementById('incrementoo')

  initCount(){
    this.Prueba.pipe(
      startWith( {
        pause: true,
        counterV: 10,
        upDown:true,
        increment:1

      }), 
      scan((accs,curr)=>({...accs,...curr})),
      tap((al)=>al.counterV=this.counte),
     switchMap((s)=>
      s.counterV ? interval(1000).pipe(
        tap(()=>
          s.counterV += s.upDown ? s.increment : -s.upDown
        ),
        tap(()=>this.counte= s.counterV)
      )
      :NEVER ) 
      
    )

  }

  
  started(f: boolean){
    this.Prueba.next({pause: false,
      counterV: 0,
      upDown:true,
      increment:1})

  }
  puased(f: boolean){}
  reseted(){}
  uped(f: boolean){}
  done(f: boolean){}









  onKey(va:any){
    // let va!:number;
    return this.counte += va
  }
  counterInit(){
    this.counteSubjeqPrueba.pipe(
      startWith({
        pause: true, 
        counterValue: this.h,
        increment: 1,
        countUp:true}),

        scan((acc, val)=>({...acc,...val})),

        tap((mapp)=>this.counte = mapp.counterValue),

        switchMap((stae)=>
        stae.pause 
        ? NEVER :  interval(1000).pipe(
            tap(
              ()=>(stae.counterValue+= 1 ? stae.increment : -stae.increment)
            ),
            tap(()=>this.counte = stae.counterValue)

          ) 
        
        ) 
        
    ).subscribe();
  }


  start(f:boolean = true){
    // this.counteSubje.next({pause:false})
    this.counteSubjeqPrueba.next({pause: f})
    console.log('Se inicia el conteo');
    
  }

  pause(f: boolean = false){
    // this.counteSubje.next({pause:true})
    this.counteSubjeqPrueba.next({pause: f})

    console.log( 'Se pausa');
    
  }

  reset(){
    this.counteSubjeqPrueba.next({counterValue: 0})
    console.log('Desde cerooo')
  }

  countUp(increment: boolean = true){
    this.counteSubjeqPrueba.next({countUp: increment, increment: true})

    
    
    // this.counter+= this.counteSubje.next({counterValue:1})
    // this.counter++;
    console.log('Cuenta progresiva')
  }

  countDown(down: boolean = false){
    this.counteSubje.next({ countUp: false, increment: down})
    console.log('Cuenta regresiva')
  }




*/
