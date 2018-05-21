import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPagePageApplicationPropertyComponent } from './index-page-page-application-property.component';

describe('IndexPagePageApplicationPropertyComponent', () => {
  let component: IndexPagePageApplicationPropertyComponent;
  let fixture: ComponentFixture<IndexPagePageApplicationPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPagePageApplicationPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPagePageApplicationPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
