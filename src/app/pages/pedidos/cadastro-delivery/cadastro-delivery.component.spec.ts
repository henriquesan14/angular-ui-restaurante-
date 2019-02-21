import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeliveryComponent } from './cadastro-delivery.component';

describe('CadastroDeliveryComponent', () => {
  let component: CadastroDeliveryComponent;
  let fixture: ComponentFixture<CadastroDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
