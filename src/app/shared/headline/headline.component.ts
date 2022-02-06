import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent implements OnInit {
  @Input() post!: Post;

  constructor() {}

  ngOnInit(): void {}

  goToPost(url: string, id: number) {
    document.getElementById(`${id}`)?.classList.add('headline--is-selected');
    window.open(url, '_blank');
  }
}
