import { Component} from '@angular/core';
import { MesaService } from 'src/app/services/domain/mesa.service';
import { Router } from '@angular/router';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Component({
  selector: 'app-cadastro-mesa',
  templateUrl: './cadastro-mesa.component.html',
  styleUrls: ['./cadastro-mesa.component.css']
})
export class CadastroMesaComponent {

  constructor(private mesaService: MesaService, private router: Router) { }

  addMesa(mesa: MesaDTO) {
    this.mesaService.insert(mesa)
    .subscribe(() => {this.router.navigateByUrl('/dashboard/mesas'); }, (error) => {console.log(error);});
  }

}
