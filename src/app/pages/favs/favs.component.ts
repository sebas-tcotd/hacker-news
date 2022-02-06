import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { HeadlineService } from 'src/app/services/headline.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css'],
})
export class FavsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private headlineService: HeadlineService) {}

  ngOnInit(): void {
    this.posts = this.headlineService.getSavedPosts() || [];
    console.log(this.posts);
  }
}
