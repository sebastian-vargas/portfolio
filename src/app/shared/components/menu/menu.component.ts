import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MENU_ITEMS } from '@app/shared/menu.config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [TranslateModule, CommonModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  public mobileMenu: boolean = false;
  public menuItems = MENU_ITEMS;

  constructor(private translate: TranslateService, private router:Router) {}

  switchLanguage(): void {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'es' ? 'en' : 'es';
    this.translate.use(newLang);
  }

  triggerMobileNavItem(id: string): void {
    this.mobileMenu = false;
    this.triggerNavItem(id);
  }

  triggerNavItem(id: string): void {
    this.router.navigate(['/home']);
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
}
