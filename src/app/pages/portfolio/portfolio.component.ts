import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { Project } from '@app/shared/interfaces/project.interface';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, TranslateModule, RouterModule, NgOptimizedImage],
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent {

  projectList: Project[] = [];
  apiService: ApiService = inject(ApiService);

   private unSubscribe$ = new Subject<void>();

  constructor() {
    this.apiService.getAllProjects().pipe(takeUntil(this.unSubscribe$)).subscribe((projectListResponse: Project[]) => {
      this.projectList = projectListResponse;
    },
    error => {
      console.error('Error loading JSON:', error);
    });
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
