import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { HeadlineService } from 'src/app/services/headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent implements OnInit {
  @Input() post!: Post;

  constructor(private headlineService: HeadlineService) {}

  ngOnInit(): void {}

  goToPost(url: string, id: number) {
    window.open(url, '_blank');
  }

  savePost(post: Post) {
    this.headlineService.savePost(post);
  }
}
