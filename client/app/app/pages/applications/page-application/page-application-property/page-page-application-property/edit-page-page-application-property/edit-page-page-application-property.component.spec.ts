import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPagePageApplicationPropertyComponent } from './edit-page-page-application-property.component';

describe('EditPagePageApplicationPropertyComponent', () => {
  let component: EditPagePageApplicationPropertyComponent;
  let fixture: ComponentFixture<EditPagePageApplicationPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPagePageApplicationPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPagePageApplicationPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
