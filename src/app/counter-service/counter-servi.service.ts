import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CounterServiService {

  counter:number = 0;
  startPause:boolean = true;
  upDown:boolean = true;

  interCounter: any = interval(1000);
  
  


  constructor() { }

  start(step:number){
    this.interCounter
    

  }

  pause(){

    
  }

  countUp(){
    this.upDown = true;
   
  }

  countDown(){
    this.upDown = false;
  }




}
