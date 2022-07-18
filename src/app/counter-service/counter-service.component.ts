import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CounterServiService } from './counter-servi.service';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'app-counter-service',
  templateUrl: './counter-service.component.html',
  styleUrls: ['./counter-service.component.css']
})
export class CounterServiceComponent implements OnInit {

  @ViewChild('counte', {read: ElementRef,static:true}) counter!: ElementRef;

  setr:number = 2
  startPause:boolean=true;
  upDown:boolean =true;
  interCounter: any = interval(1000);
  _susbcr=new Subject<boolean>()



  constructor(private serviceCounter: CounterServiService) { 


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
    
  }

  start(){
    this.interCounter.subscribe(
      ()=> {
        if(!this.upDown){
          this.counter.nativeElement.innerText+=this.setr
        }else{
          this.counter.nativeElement.innerText-=this.setr
        }
        
      } 
    )
   
    
  }

  pause(){
    // this._susbcr.next(false)
    this.startPause = false
  }

  reset(){
    this.counter.nativeElement.innerText =0
    this.setr=0
  }


  setTo(event:any){
 

    this.counter.nativeElement.innerText = parseInt(event.target.value);

    


  }

  incremtTo(event:any){
    
    this.setr = parseInt(event.target.value);

    


  }

  down(){
    this.upDown =true;
  }
  uped(){
    this.upDown =false;
  }

}
