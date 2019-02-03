import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMesaComponent } from './form-mesa.component';

describe('FormMesaComponent', () => {
  let component: FormMesaComponent;
  let fixture: ComponentFixture<FormMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
