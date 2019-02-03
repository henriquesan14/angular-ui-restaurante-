import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMesaComponent } from './listagem-mesa.component';

describe('ListagemMesaComponent', () => {
  let component: ListagemMesaComponent;
  let fixture: ComponentFixture<ListagemMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
