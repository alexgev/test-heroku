import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexApplicationComponent } from './index-application.component';

describe('IndexApplicationComponent', () => {
  let component: IndexApplicationComponent;
  let fixture: ComponentFixture<IndexApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
