import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtiCardComponent } from './arti-card.component';

describe('CardComponent', () => {
  let component: ArtiCardComponent;
  let fixture: ComponentFixture<ArtiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtiCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
