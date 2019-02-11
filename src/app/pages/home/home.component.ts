import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  total = 0;
  count: number;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.totalDiario();
    this.countDiario();
   }

   totalDiario(){
     this.homeService.totalDiario()
     .subscribe((response) => {
      if(response==null){
        this.total = 0;
      }else{
        this.total = response;
      }
      },
     (error) => {console.log(error);});
   }

   countDiario(){
    this.homeService.countDiario()
    .subscribe((response) => {this.count = response;},
    (error) => {console.log(error);});
  }

}
