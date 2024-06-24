import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputControlComponent } from './custom-input-control.component';

describe('CustomInputControlComponent', () => {
  let component: CustomInputControlComponent;
  let fixture: ComponentFixture<CustomInputControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputControlComponent]
    });
    fixture = TestBed.createComponent(CustomInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
