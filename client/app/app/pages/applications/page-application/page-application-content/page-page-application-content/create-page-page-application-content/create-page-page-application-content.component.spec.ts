import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePagePageApplicationContentComponent } from './create-page-page-application-content.component';

describe('CreatePagePageApplicationContentComponent', () => {
  let component: CreatePagePageApplicationContentComponent;
  let fixture: ComponentFixture<CreatePagePageApplicationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagePageApplicationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePagePageApplicationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
