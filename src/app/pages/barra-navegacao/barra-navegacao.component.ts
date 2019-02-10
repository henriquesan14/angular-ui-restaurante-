import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html',
  styleUrls: ['./barra-navegacao.component.css']
})
export class BarraNavegacaoComponent implements OnInit {


  // tslint:disable-next-line:no-output-on-prefix
  @Output() onToggle = new EventEmitter();

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService) {
     }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Desconectado!', 'Sucesso');
    this.router.navigateByUrl('');
  }

  disparaEvento() {
    this.onToggle.emit();
  }

}
