import { Component, Input } from '@angular/core';
import { Headline } from 'src/app/models/post.model';
import { HeadlineService } from 'src/app/services/headline.service';

/** Component that shows the headline. */
@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent {
  /** The data of the headline. */
  @Input() public headline!: Headline;

  constructor(private headlineService: HeadlineService) {}

  /**
   * Opens a new tab with the original news.
   * @param url The URL source of the headline.
   */
  public goToPost(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Toggles the state of the headline whether is favorite or not.
   * @param headline The headline to be changed of status.
   */
  public toggleFavoriteStatus(headline: Headline): void {
    if (!headline.is_favorite) {
      this.headlineService.saveAsFavorite(headline);
    } else {
      this.headlineService.removeFavorite(headline);
    }
  }
}
