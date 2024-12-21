import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "@components/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuComponent } from "./shared/components/menu/menu.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    CommonModule,
    FooterComponent,
    TranslateModule,
    MenuComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
