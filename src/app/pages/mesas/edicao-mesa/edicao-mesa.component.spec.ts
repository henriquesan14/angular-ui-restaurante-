import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoMesaComponent } from './edicao-mesa.component';

describe('EdicaoMesaComponent', () => {
  let component: EdicaoMesaComponent;
  let fixture: ComponentFixture<EdicaoMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
