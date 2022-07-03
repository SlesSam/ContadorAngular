import { Component, OnInit } from '@angular/core';
import { interval, } from 'rxjs';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  counterInterval!:any;
  counter:any = 0;
  step = 1;
  // start:any;

  constructor() { }

  ngOnInit(): void {
    this.counterInterval = interval(1000);

    this.start()

    
    
  }

  start(){
    this.start = () =>{
      this.counterInterval.subscribe((n: any)=>{
        n = this.counter += this.step
        if(n){
          this.up()
         
        }else if(!n){
         
         this.down()

        }

        console.log(n)
        return n
  
      })

    }
  }

  pause(){
    clearInterval(this.counterInterval)
  }

  initi(){
    this.counter = 0;
  }

  up(){
    this.counter+=this.step
  }

  down(){
    this.counter-=this.step
  }


  coutInit(n:any){
    this.counter = Number(n.target.value);
  }


}
