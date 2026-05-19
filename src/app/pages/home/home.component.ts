import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutComponent } from "@pages/about/about.component";
import { ServicesComponent } from '@pages/services/services.component';
import { PortfolioComponent } from "@pages/portfolio/portfolio.component";
import { ClientsComponent } from "@pages/clients/clients.component";
import { WorkComponent } from "@pages/work/work.component";
import { StatisticsComponent } from "@pages/statistics/statistics.component";
import { BlogComponent } from "@pages/blog/blog.component";
import { ContactComponent } from "@pages/contact/contact.component";
import { OtherProjectsComponent } from '../other-projects/other-projects.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    ServicesComponent,
    AboutComponent,
    PortfolioComponent,
    ClientsComponent,
    WorkComponent,
    OtherProjectsComponent,
    StatisticsComponent,
    BlogComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['scrollTo']) {
        this.scrollWithRetry(params['scrollTo']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private scrollWithRetry(elementId: string, attempts = 0): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (attempts < 10) {
      setTimeout(() => this.scrollWithRetry(elementId, attempts + 1), 100);
    }
  }
}
