import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-other-projects',
  imports: [TranslateModule, CommonModule],
  templateUrl: './other-projects.component.html'
})
export class OtherProjectsComponent {
  selectedImage: string | null = null;

  openImageModal(imagePath: string): void {
    this.selectedImage = imagePath;
  }

  closeImageModal(): void {
    this.selectedImage = null;
  }
}
