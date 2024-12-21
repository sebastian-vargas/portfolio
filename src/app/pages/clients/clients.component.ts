import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Company } from '@app/shared/interfaces/company.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, TranslateModule],
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  companiesList: Company[] = [];
  apiService: ApiService = inject(ApiService);

  constructor() {
    this.apiService.getAllCompanies().subscribe((companiesList: Company[]) => {
      this.companiesList = companiesList;
    });
  }
}
