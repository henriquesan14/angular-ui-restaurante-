import { Component} from '@angular/core';
import { MesaService } from 'src/app/services/domain/mesa.service';
import { Router } from '@angular/router';
import { MesaDTO } from 'src/app/models/mesa.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-mesa',
  templateUrl: './cadastro-mesa.component.html',
  styleUrls: ['./cadastro-mesa.component.css']
})
export class CadastroMesaComponent {

  constructor(private mesaService: MesaService,
     private router: Router,
     private toastr: ToastrService) { }

  addMesa(mesa: MesaDTO) {
    this.mesaService.insert(mesa)
    .subscribe(() => {
      this.toastr.success('Mesa cadastrada!', 'Sucesso');
      this.router.navigateByUrl('/dashboard/mesas'); }, 
      (error) => {console.log(error);
      this.toastr.error('Falha ao cadastrar', 'Falha'); });
  }

}
