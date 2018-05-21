import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageApplicationContentComponent } from './index-page-application-content.component';

describe('IndexPageApplicationContentComponent', () => {
  let component: IndexPageApplicationContentComponent;
  let fixture: ComponentFixture<IndexPageApplicationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageApplicationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageApplicationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
