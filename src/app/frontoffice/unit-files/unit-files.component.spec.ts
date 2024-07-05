import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFilesComponent } from './unit-files.component';

describe('UnitFilesComponent', () => {
  let component: UnitFilesComponent;
  let fixture: ComponentFixture<UnitFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnitFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
