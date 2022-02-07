import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { HeadlineService } from 'src/app/services/headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent {
  @Input() public post!: Post;

  constructor(private headlineService: HeadlineService) {}

  public goToPost(url: string): void {
    window.open(url, '_blank');
  }

  public toggleFavoriteStatus(post: Post): void {
    if (!post.is_favorite) {
      this.headlineService.saveAsFavorite(post);
    } else {
      this.headlineService.removeFavorite(post);
    }
  }
}
