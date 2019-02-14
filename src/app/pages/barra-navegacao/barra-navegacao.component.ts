import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html',
  styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent implements OnInit {


  // tslint:disable-next-line:no-output-on-prefix
  @Output() onToggle = new EventEmitter();

  constructor(public homeService: HomeService) {
     }

  ngOnInit() {
    this.atualizaDemandasCozinha();
    this.atualizaDemandasGarcom();
  }

  atualizaDemandasCozinha(){
    this.homeService.atualizaDemandasCozinha()
    .subscribe(() => {});
  }
  
  atualizaDemandasGarcom(){
    this.homeService.atualizaDemandasGarcom()
    .subscribe(() => {});
  }


  disparaEvento() {
    this.onToggle.emit();
  }

}
