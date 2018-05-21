import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageApplicationContentComponent } from './create-page-application-content.component';

describe('CreatePageApplicationContentComponent', () => {
  let component: CreatePageApplicationContentComponent;
  let fixture: ComponentFixture<CreatePageApplicationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePageApplicationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePageApplicationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
