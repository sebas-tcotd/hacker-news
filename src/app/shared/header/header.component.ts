import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebarCheck') sidebarCheck!: ElementRef;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {}

  searchByFramework(framework: string) {
    this.newsService.setSearch(framework);

    this.sidebarCheck.nativeElement.checked = false;
  }
}
