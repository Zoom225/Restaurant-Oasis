import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RESTAURANT } from '../../data/restaurant.data';
import { ImageLightboxComponent } from './image-lightbox.component';

describe('ImageLightboxComponent', () => {
  let fixture: ComponentFixture<ImageLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageLightboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageLightboxComponent);
    fixture.componentRef.setInput('images', RESTAURANT.gallery.slice(0, 2));
    fixture.detectChanges();
  });

  it('ouvre puis ferme la galerie', () => {
    const firstImage = fixture.nativeElement.querySelector(
      '[data-testid="gallery-item"] button',
    ) as HTMLButtonElement;
    firstImage.click();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="lightbox"]'),
    ).not.toBeNull();

    const closeButton = fixture.nativeElement.querySelector(
      '[data-testid="lightbox-close"]',
    ) as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('[data-testid="lightbox"]'),
    ).toBeNull();
  });
});
