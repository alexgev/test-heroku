import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageApplicationContentComponent } from './edit-page-application-content.component';

describe('EditPageApplicationContentComponent', () => {
  let component: EditPageApplicationContentComponent;
  let fixture: ComponentFixture<EditPageApplicationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPageApplicationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageApplicationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
