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
  private speed = 0.5; // px per frame
  private trackWidth = 0;
  private isPaused = false;

  @ViewChild('marqueeTrack') marqueeTrack!: ElementRef<HTMLDivElement>;

  constructor() {
    this.apiService.getAllCompanies().subscribe((companies: Company[]) => {
      this.companiesList = companies;
      // Wait for DOM to render the items
      setTimeout(() => this.startAnimation(), 100);
    });
  }

  ngAfterViewInit(): void {
    // If data already loaded
    if (this.companiesList.length > 0) {
      this.startAnimation();
    }
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  onMouseEnter(): void {
    // Only pause on real hover (desktop)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.isPaused = true;
    }
  }

  onMouseLeave(): void {
    this.isPaused = false;
  }

  private startAnimation(): void {
    if (this.animationId !== null) return;
    const track = this.marqueeTrack?.nativeElement;
    if (!track) return;

    // Calculate half-width (we duplicate the list, so half = one full set)
    this.trackWidth = track.scrollWidth / 2;

    if (this.trackWidth === 0) return;

    // Adjust speed for mobile
    this.speed = window.innerWidth < 640 ? 0.8 : 0.5;

    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        if (!this.isPaused) {
          this.offset -= this.speed;
          if (Math.abs(this.offset) >= this.trackWidth) {
            this.offset = 0;
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

