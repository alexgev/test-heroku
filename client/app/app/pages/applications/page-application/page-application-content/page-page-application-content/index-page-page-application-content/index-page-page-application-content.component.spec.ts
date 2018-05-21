import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPagePageApplicationContentComponent } from './index-page-page-application-content.component';

describe('IndexPagePageApplicationContentComponent', () => {
  let component: IndexPagePageApplicationContentComponent;
  let fixture: ComponentFixture<IndexPagePageApplicationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPagePageApplicationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPagePageApplicationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
