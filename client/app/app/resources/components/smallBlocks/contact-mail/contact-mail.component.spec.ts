import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMailComponent } from './contact-mail.component';

describe('ContactMailComponent', () => {
  let component: ContactMailComponent;
  let fixture: ComponentFixture<ContactMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
