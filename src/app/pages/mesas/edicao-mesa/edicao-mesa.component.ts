import { Component, OnInit } from '@angular/core';
import { MesaDTO } from 'src/app/models/mesa.dto';
import { MesaService } from 'src/app/services/domain/mesa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicao-mesa',
  templateUrl: './edicao-mesa.component.html',
  styleUrls: ['./edicao-mesa.component.css']
})
export class EdicaoMesaComponent implements OnInit {

  mesa: MesaDTO = <MesaDTO>{};
  id: string;
  constructor(private mesaService: MesaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.findMesa(this.activatedRoute.snapshot.params.id);
  }

  findMesa(id: string){
    this.mesaService.find(id)
    .subscribe((response) => {
      this.mesa = response;
    },
    (errror) => {
      this.toastr.error('Falha ao carregar mesa', 'Falha');
    });
  }

  updateMesa(mesa: MesaDTO){
    this.mesaService.update(mesa)
    .subscribe(() => {
      this.toastr.success('Mesa atualizada', 'Sucesso');
      this.router.navigateByUrl('dashboard/mesas');
    },
    (error) => {
      this.toastr.error(error.error.message, 'Falha');
    });
  }

}
