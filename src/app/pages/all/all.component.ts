import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
  @ViewChild('categories') categories!: ElementRef;
  posts!: Post[];
  frameworkWord: string = '';
  searchSubscription!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.searchSubscription = this.newsService.search$
      .pipe(tap((word) => this.searchByFramework(word)))
      .subscribe();
    this.newsService.getNews().subscribe((posts) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  searchByFramework(framework: string): void {
    this.newsService
      .getNews(framework)
      .subscribe((posts) => (this.posts = posts));

    this.categories.nativeElement.checked = false;
  }
}
