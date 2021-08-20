import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotForUseComponent } from './not-for-use.component';

describe('NotForUseComponent', () => {
  let component: NotForUseComponent;
  let fixture: ComponentFixture<NotForUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotForUseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotForUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
