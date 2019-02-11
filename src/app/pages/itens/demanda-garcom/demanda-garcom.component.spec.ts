import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaGarcomComponent } from './demanda-garcom.component';

describe('DemandaGarcomComponent', () => {
  let component: DemandaGarcomComponent;
  let fixture: ComponentFixture<DemandaGarcomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandaGarcomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandaGarcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
