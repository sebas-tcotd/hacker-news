import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

/** Component that shows the header. */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private newsService: NewsService) {}

  /**
   * Sets the sign to the Subject to search for the word.
   * @param framework The framework word to be searched.
   */
  public searchByFramework(framework: string): void {
    this.newsService.setSearch(framework);
  }
}
