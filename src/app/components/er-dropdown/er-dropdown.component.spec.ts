import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErDropdownComponent } from './er-dropdown.component';

describe('ErDropdownComponent', () => {
  let component: ErDropdownComponent;
  let fixture: ComponentFixture<ErDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
