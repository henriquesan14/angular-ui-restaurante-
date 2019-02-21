import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryProdutosCategoriasComponent } from './delivery-produtos-categorias.component';

describe('DeliveryProdutosCategoriasComponent', () => {
  let component: DeliveryProdutosCategoriasComponent;
  let fixture: ComponentFixture<DeliveryProdutosCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryProdutosCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryProdutosCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
