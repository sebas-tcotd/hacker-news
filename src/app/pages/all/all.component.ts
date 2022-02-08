import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Headline } from 'src/app/models/post.model';
import { NewsService } from 'src/app/services/news.service';

/** Component that shows the main page. */
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
  /** List of headlines. */
  public headlines!: Headline[];

  /** The framework filter word. */
  public frameworkWord: string = '';

  /** Subscription for receiving the headlines by filter. */
  public searchSubscription!: Subscription;

  constructor(private newsService: NewsService) {}

  /** @ignore */
  ngOnInit(): void {
    this.searchSubscription = this.newsService.search$
      .pipe(
        tap((word) => {
          this.frameworkWord = word;
        })
      )
      .subscribe((word) => this.searchByFramework(word));

    this.newsService.getNews().subscribe((posts) => (this.headlines = posts));
  }

  /** @ignore */
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.newsService.resetNewsPage();
  }

  /**
   * Search the news based on the framework word.
   * @param framework The framwework word to be searched.
   */
  public searchByFramework(framework: string): void {
    this.newsService.resetNewsPage();
    this.newsService
      .getNews(framework)
      .subscribe((posts) => (this.headlines = posts));
  }

  /** Determines when to search and show the news again based on the scroll position. */
  @HostListener('window: scroll')
  public onScroll(): void {
    const threshold = 1500;
    const currentPosition =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      threshold;
    const maxViewport =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (currentPosition > maxViewport) {
      if (this.newsService.isPageLoading) return;

      this.newsService
        .getNews()
        .subscribe((news) => this.headlines.push(...news));
    }
  }
}
