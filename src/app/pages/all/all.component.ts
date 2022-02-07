import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
  public posts!: Post[];
  public frameworkWord: string = '';
  public searchSubscription!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.searchSubscription = this.newsService.search$
      .pipe(
        tap((word) => {
          this.frameworkWord = word;
        })
      )
      .subscribe((word) => this.searchByFramework(word));

    this.newsService.getNews().subscribe((posts) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.newsService.resetNewsPage();
  }

  public searchByFramework(framework: string): void {
    this.newsService.resetNewsPage();
    this.newsService
      .getNews(framework)
      .subscribe((posts) => (this.posts = posts));
  }

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

      this.newsService.getNews().subscribe((news) => this.posts.push(...news));
    }
  }
}
