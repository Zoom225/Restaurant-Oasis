import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MenuPageComponent } from './menu.page';

describe('MenuPageComponent', () => {
  let fixture: ComponentFixture<MenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPageComponent);
    fixture.detectChanges();
  });

  it('recherche un plat sans tenir compte des accents', () => {
    const input = fixture.nativeElement.querySelector(
      '[data-testid="menu-search"]',
    ) as HTMLInputElement;
    input.value = 'soumbala';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const items = Array.from(
      fixture.nativeElement.querySelectorAll('[data-testid="menu-item"]'),
    ) as HTMLElement[];

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.textContent?.toLowerCase().includes('soumbala'))).toBe(true);
  });

  it('filtre la carte par catégorie', () => {
    const beersButton = fixture.nativeElement.querySelector(
      '[data-testid="category-bieres"]',
    ) as HTMLButtonElement;
    beersButton.click();
    fixture.detectChanges();

    const pageText = fixture.nativeElement.textContent as string;
    expect(pageText).toContain('Beaufort');
    expect(pageText).not.toContain('Mojito nature');
  });

  it('recherche dans tout le menu même après la sélection d’une catégorie', () => {
    const beersButton = fixture.nativeElement.querySelector(
      '[data-testid="category-bieres"]',
    ) as HTMLButtonElement;
    beersButton.click();

    const input = fixture.nativeElement.querySelector(
      '[data-testid="menu-search"]',
    ) as HTMLInputElement;
    input.value = 'mojito fraise';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const pageText = fixture.nativeElement.textContent as string;
    expect(pageText).toContain('Mojito fraise');
    expect(fixture.componentInstance.activeCategory()).toBe('all');
  });

  it('accepte les variantes avec accents, apostrophes et mots séparés', () => {
    const input = fixture.nativeElement.querySelector(
      '[data-testid="menu-search"]',
    ) as HTMLInputElement;
    input.value = 'saveur afrique clementine';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'Saveur d’Afrique — Clémentine',
    );
  });
});
