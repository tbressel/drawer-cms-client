import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiCardComponent } from './certifi-card.component';

describe('CertifiCardComponent', () => {
  let component: CertifiCardComponent;
  let fixture: ComponentFixture<CertifiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertifiCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertifiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
