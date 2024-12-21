import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { OtherProject } from '@app/shared/interfaces/project.details';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-other-projects',
  imports: [TranslateModule, CommonModule],
  templateUrl: './other-projects.component.html'
})
export class OtherProjectsComponent {
  projectList: OtherProject[] = [];
  apiService: ApiService = inject(ApiService);

  private unSubscribe$ = new Subject<void>();
  currentLanguage: string | undefined;
  constructor(private translateService: TranslateService) {
    this.apiService.getAllOtherProject().pipe(takeUntil(this.unSubscribe$)).subscribe((projectListResponse: OtherProject[]) => {
      this.projectList = projectListResponse;
    },
    error => {
      console.error('Error loading JSON:', error);
    });
  }
  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang || this.translateService.getDefaultLang();
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
