import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private newsService: NewsService) {}

  searchByFramework(framework: string) {
    this.newsService.setSearch(framework);
  }
}
