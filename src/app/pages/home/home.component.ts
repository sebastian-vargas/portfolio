import { Component, Input, SimpleChanges } from '@angular/core';
import { AboutComponent } from "@pages/about/about.component";
import { ServicesComponent } from '@pages/services/services.component';
import { PortfolioComponent } from "@pages/portfolio/portfolio.component";
import { ClientsComponent } from "@pages/clients/clients.component";
import { WorkComponent } from "@pages/work/work.component";
import { StatisticsComponent } from "@pages/statistics/statistics.component";
import { BlogComponent } from "@pages/blog/blog.component";
import { ContactComponent } from "@pages/contact/contact.component";
import { OtherProjectsComponent } from '../other-projects/other-projects.component';

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
/**
 * @description HomeComponent contiene las paginas a mostrar, al tener un identificador cada pagina
 * el menuComponent hace un scrollIntoView de tipo smooth hacia ese identificador
 * por lo cual no es necesario hacer uso de @Input o @Output ya que al estar en la misma hoja en el DOM
 * toma la navegación hacia el componente
 * 
 */
export class HomeComponent {}
