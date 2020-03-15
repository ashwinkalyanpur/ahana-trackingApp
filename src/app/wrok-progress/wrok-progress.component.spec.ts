import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrokProgressComponent } from './wrok-progress.component';

describe('WrokProgressComponent', () => {
  let component: WrokProgressComponent;
  let fixture: ComponentFixture<WrokProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrokProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrokProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
