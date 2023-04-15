import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargardatosComponent } from './cargardatos.page';

describe('CargardatosComponent', () => {
  let component: CargardatosComponent;
  let fixture: ComponentFixture<CargardatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargardatosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargardatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
