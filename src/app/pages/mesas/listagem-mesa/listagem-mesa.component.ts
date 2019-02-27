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

  public loader = false;
  public error = false;
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
    this.loader = true;
    this.mesaService.findAll()
    .subscribe((response: MesaDTO[]) => {this.mesas = response;
    this.loader = false; },
    (error) => {console.log(error);
    this.error= true;
    this.loader = false; });
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
