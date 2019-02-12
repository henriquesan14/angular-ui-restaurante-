import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensDiariosComponent } from './itens-diarios.component';

describe('ItensDiariosComponent', () => {
  let component: ItensDiariosComponent;
  let fixture: ComponentFixture<ItensDiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensDiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensDiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
