import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemocomponentComponent } from './democomponent.component';

describe('DemocomponentComponent', () => {
  let component: DemocomponentComponent;
  let fixture: ComponentFixture<DemocomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemocomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemocomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
