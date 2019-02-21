import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTiposCategoriasComponent } from './delivery-tipos-categorias.component';

describe('DeliveryTiposCategoriasComponent', () => {
  let component: DeliveryTiposCategoriasComponent;
  let fixture: ComponentFixture<DeliveryTiposCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryTiposCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTiposCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
