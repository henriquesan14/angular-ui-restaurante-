import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaCozinhaComponent } from './demanda-cozinha.component';

describe('DemandaCozinhaComponent', () => {
  let component: DemandaCozinhaComponent;
  let fixture: ComponentFixture<DemandaCozinhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandaCozinhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaCozinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
