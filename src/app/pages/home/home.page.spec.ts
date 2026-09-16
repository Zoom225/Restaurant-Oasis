import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './home.page';

describe('HomePageComponent', () => {
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
  });

  it('n’affiche aucun bouton téléphone ou WhatsApp sans coordonnées confirmées', () => {
    expect(
      fixture.nativeElement.querySelector('[data-testid="phone-button"]'),
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector('[data-testid="whatsapp-button"]'),
    ).toBeNull();
  });
});
