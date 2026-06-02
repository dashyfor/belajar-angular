import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

declare const $ : any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [ FooterComponent, HeaderComponent, SidebarComponent ],
  templateUrl: './forex.component.html',
  styleUrl: './forex.component.css'
})
export class ForexComponent implements AfterViewInit {

  private _table1 : any;

  constructor(
    private renderer: Renderer2,
    private httpClient: HttpClient
  ) {}

  ngAfterViewInit(): void {

    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapse");

  }
}