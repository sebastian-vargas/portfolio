import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Company } from '@app/shared/interfaces/company.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, TranslateModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements AfterViewInit, OnDestroy {
  companiesList: Company[] = [];
  private apiService = inject(ApiService);
  private ngZone = inject(NgZone);
  private animationId: number | null = null;
  private offset = 0;
  private speed = 0.5;
  private setWidth = 0;
  private isPaused = false;

  @ViewChild('marqueeTrack') marqueeTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('firstSet') firstSet!: ElementRef<HTMLDivElement>;

  constructor() {
    this.apiService.getAllCompanies().subscribe((companies: Company[]) => {
      this.companiesList = companies;
    });
  }

  ngAfterViewInit(): void {
    // Wait for images inside the component to fully load before measuring
    this.waitForImages().then(() => this.startAnimation());
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  onMouseEnter(): void {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.isPaused = true;
    }
  }

  onMouseLeave(): void {
    this.isPaused = false;
  }

  private waitForImages(): Promise<void> {
    const container = this.firstSet?.nativeElement;
    if (!container) return Promise.resolve();

    const images = Array.from(container.querySelectorAll('img'));
    if (images.length === 0) {
      // No images yet, wait for Angular to render
      return new Promise(resolve => setTimeout(() => this.waitForImages().then(resolve), 150));
    }

    const promises = images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>(resolve => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    return Promise.all(promises).then(() => {});
  }

  private startAnimation(): void {
    if (this.animationId !== null) return;

    const track = this.marqueeTrack?.nativeElement;
    const firstSetEl = this.firstSet?.nativeElement;
    if (!track || !firstSetEl) return;

    // Measure the exact width of the first set (one full copy)
    this.setWidth = firstSetEl.offsetWidth;
    if (this.setWidth === 0) return;

    this.speed = window.innerWidth < 640 ? 0.8 : 0.5;

    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        if (!this.isPaused) {
          this.offset -= this.speed;
          // Reset seamlessly when first set is fully scrolled out
          if (Math.abs(this.offset) >= this.setWidth) {
            this.offset += this.setWidth;
          }
          track.style.transform = `translateX(${this.offset}px)`;
        }
        this.animationId = requestAnimationFrame(animate);
      };
      this.animationId = requestAnimationFrame(animate);
    });
  }

  private stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

