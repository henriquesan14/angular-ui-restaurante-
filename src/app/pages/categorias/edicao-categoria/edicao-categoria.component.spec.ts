import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoCategoriaComponent } from './edicao-categoria.component';

describe('EdicaoCategoriaComponent', () => {
  let component: EdicaoCategoriaComponent;
  let fixture: ComponentFixture<EdicaoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
