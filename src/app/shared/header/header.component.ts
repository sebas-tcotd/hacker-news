import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private newsService: NewsService) {}

  public searchByFramework(framework: string): void {
    this.newsService.setSearch(framework);
  }
}
