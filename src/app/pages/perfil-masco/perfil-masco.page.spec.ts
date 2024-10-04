import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilMascoPage } from './perfil-masco.page';

describe('PerfilMascoPage', () => {
  let component: PerfilMascoPage;
  let fixture: ComponentFixture<PerfilMascoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMascoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
