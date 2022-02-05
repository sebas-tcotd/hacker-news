import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  posts!: Post[];
  @ViewChild('categories') categories!: ElementRef;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((posts) => (this.posts = posts));
  }

  searchByFramework(framework: string) {
    this.newsService
      .getNews(framework)
      .subscribe((posts) => (this.posts = posts));

    this.categories.nativeElement.checked = false;
  }
}
