import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarouselModule
  ],
  template: `
    <ngb-carousel>
      @for (image of images; track $index) {
        <ng-template ngbSlide>
          <div>
            <img [src]="image" alt="Foto non disponibile" class="carousel-img"/>
          </div>
        </ng-template>
      }
    </ngb-carousel>
  `,
  styleUrl: './carousel.component.scss',
})

export class CarouselComponent {

  @Input() images!: any[];

}
