import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

@Component({
  template: '<p>{{ label }}</p>',
})
class MenuStubComponent {
  readonly label = 'Menu';
}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([{ path: 'menu', component: MenuStubComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('affiche l’en-tête du restaurant', () => {
    const header = fixture.nativeElement.querySelector(
      '[data-testid="site-header"]',
    ) as HTMLElement | null;

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('Espace Oasis');
  });

  it('ouvre puis ferme le menu mobile', () => {
    const toggle = fixture.nativeElement.querySelector(
      '[data-testid="mobile-toggle"]',
    ) as HTMLButtonElement;

    toggle.click();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-testid="mobile-nav"]'),
    ).not.toBeNull();

    const close = fixture.nativeElement.querySelector(
      '[data-testid="mobile-close"]',
    ) as HTMLButtonElement;
    close.click();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-testid="mobile-nav"]'),
    ).toBeNull();
  });

  it('navigue vers la carte', async () => {
    const link = fixture.nativeElement.querySelector(
      '[data-testid="header-menu-link"]',
    ) as HTMLAnchorElement;

    link.click();
    await fixture.whenStable();

    expect(TestBed.inject(Location).path()).toBe('/menu');
  });
});
