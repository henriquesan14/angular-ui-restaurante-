import { Component, OnInit } from '@angular/core';
import { MesaDTO } from 'src/app/models/mesa.dto';
import { MesaService } from 'src/app/services/domain/mesa.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listagem-mesa',
  templateUrl: './listagem-mesa.component.html',
  styleUrls: ['./listagem-mesa.component.css']
})
export class ListagemMesaComponent implements OnInit {

  mesas: MesaDTO[];
  id: string;
  constructor(private mesaService: MesaService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.findAll();
  }

  trocaId(id: string) {
    this.id = id;
  }

  findAll() {
    this.mesaService.findAll()
    .subscribe((response: MesaDTO[]) => {this.mesas = response; },
    (error) => {console.log(error); });
  }

  deletaMesa(){
    this.mesaService.delete(this.id)
    .subscribe(() => {
      this.toastr.success('Mesa apagada', 'Sucesso');
      this.findAll();
    },
    (error) => {
      this.toastr.error(error.error.message, 'Falha');
    });
  }

  existemMesas(): boolean {
    return this.mesas && this.mesas.length > 0;
  }

}
