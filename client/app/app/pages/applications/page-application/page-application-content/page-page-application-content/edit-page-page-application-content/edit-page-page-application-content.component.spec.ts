import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPagePageApplicationContentComponent } from './edit-page-page-application-content.component';

describe('EditPagePageApplicationContentComponent', () => {
  let component: EditPagePageApplicationContentComponent;
  let fixture: ComponentFixture<EditPagePageApplicationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPagePageApplicationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPagePageApplicationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
