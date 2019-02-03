import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoEnderecoComponent } from './edicao-endereco.component';

describe('EdicaoEnderecoComponent', () => {
  let component: EdicaoEnderecoComponent;
  let fixture: ComponentFixture<EdicaoEnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
