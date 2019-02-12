import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosDiariosComponent } from './pedidos-diarios.component';

describe('PedidosDiariosComponent', () => {
  let component: PedidosDiariosComponent;
  let fixture: ComponentFixture<PedidosDiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosDiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosDiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
