import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaDetailPage } from './conta-detail.page';

describe('ContaDetailPage', () => {
  let component: ContaDetailPage;
  let fixture: ComponentFixture<ContaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
