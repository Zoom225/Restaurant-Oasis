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

  it('affiche les coordonnées confirmées pour réserver', () => {
    const phoneButton = fixture.nativeElement.querySelector(
      '[data-testid="phone-button"]',
    ) as HTMLAnchorElement;
    const whatsappButton = fixture.nativeElement.querySelector(
      '[data-testid="whatsapp-button"]',
    ) as HTMLAnchorElement;

    expect(phoneButton.getAttribute('href')).toBe('tel:+2250757238217');
    expect(whatsappButton.getAttribute('href')).toContain(
      'https://wa.me/2250757238217',
    );
  });
});
