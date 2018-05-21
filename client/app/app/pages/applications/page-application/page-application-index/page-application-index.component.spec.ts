import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageApplicationIndexComponent } from './page-application-index.component';

describe('PageApplicationIndexComponent', () => {
  let component: PageApplicationIndexComponent;
  let fixture: ComponentFixture<PageApplicationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageApplicationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageApplicationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
