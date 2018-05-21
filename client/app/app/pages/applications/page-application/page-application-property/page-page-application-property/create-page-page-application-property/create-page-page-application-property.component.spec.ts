import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePagePageApplicationPropertyComponent } from './create-page-page-application-property.component';

describe('CreatePagePageApplicationPropertyComponent', () => {
  let component: CreatePagePageApplicationPropertyComponent;
  let fixture: ComponentFixture<CreatePagePageApplicationPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagePageApplicationPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePagePageApplicationPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
