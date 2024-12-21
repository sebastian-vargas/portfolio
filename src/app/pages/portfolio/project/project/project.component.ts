import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { ProjectDetails } from '@app/shared/interfaces/project.details';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [RouterModule, CommonModule, TranslateModule, NgOptimizedImage],
  templateUrl: './project.component.html'
})
export class ProjectComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiService: ApiService = inject(ApiService);
  project : ProjectDetails[] = [];

  private unSubscribe$ = new Subject<void>();
  currentLanguage: string | undefined;

    isMobile: boolean = false;
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.isMobile = event.target.innerWidth < 768;
    }

  constructor(private router: Router, private translateService: TranslateService) {
    const projectId = Number(this.route.snapshot.params['id']);
    this.apiService.getImagesByIdProject(projectId).pipe(takeUntil(this.unSubscribe$)).subscribe((project: ProjectDetails[]) => {
      this.project = project;
    },
    error => {
      console.error('Error loading JSON:', error);
    });
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.scrollToElementId('presentation')
    this.currentLanguage = this.translateService.currentLang || this.translateService.getDefaultLang();
    this.translateService.onLangChange.pipe(takeUntil(this.unSubscribe$))
    .subscribe((event) => {
      this.currentLanguage = event.lang;
    }); 
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  scrollToPortfolio() : void {
  this.router.navigate(['/home'], { queryParams: { scrollTo: 'portfolio' } }).then(() => {
    // Espera que la ruta y la vista se carguen antes de hacer scroll
    this.scrollToElementId('portfolio')
  });
  }


  scrollToElementId(idElement:string) : void {
    setTimeout(() => {
      const element = document.getElementById(idElement);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  }
}
