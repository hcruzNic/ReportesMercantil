import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociedadesInscritasComponent } from './sociedades-inscritas.component';

describe('SociedadesInscritasComponent', () => {
  let component: SociedadesInscritasComponent;
  let fixture: ComponentFixture<SociedadesInscritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SociedadesInscritasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociedadesInscritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
