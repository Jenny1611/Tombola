import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TombolaCardComponent } from './tombola-card.component';

describe('TombolaCardComponent', () => {
  let component: TombolaCardComponent;
  let fixture: ComponentFixture<TombolaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TombolaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TombolaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
