import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaListPage } from './conta-list.page';

describe('ContaListPage', () => {
  let component: ContaListPage;
  let fixture: ComponentFixture<ContaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
