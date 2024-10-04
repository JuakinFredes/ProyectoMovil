import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearMascoPage } from './crear-masco.page';

describe('CrearMascoPage', () => {
  let component: CrearMascoPage;
  let fixture: ComponentFixture<CrearMascoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMascoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
