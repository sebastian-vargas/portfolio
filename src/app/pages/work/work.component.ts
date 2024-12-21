import { Component, inject } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Company } from '@app/shared/interfaces/company.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-work',
  imports: [TranslateModule],
  templateUrl: './work.component.html'
})
export class WorkComponent {
  companiesList: Company[] = [];
  apiService: ApiService = inject(ApiService);

  constructor() {
    this.apiService.getAllCompanies().subscribe((companiesList: Company[]) => {
      this.companiesList = companiesList;
    });
  }
}
