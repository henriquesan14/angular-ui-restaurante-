import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-painel-simples',
  templateUrl: './painel-simples.component.html',
  styleUrls: ['./painel-simples.component.css']
})
export class PainelSimplesComponent implements OnInit {

  @Input() titulo;
  @Input() col;
  @Input() tipo;
  scroll = false;

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 500) {
      this.scroll = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      // tslint:disable-next-line:no-unused-expression
      event.target.innerWidth;
      if (window.innerWidth < 500) {
        this.scroll = true;
      }
  }

}
