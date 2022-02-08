import { Component, OnInit } from '@angular/core';
import { Headline } from 'src/app/models/post.model';
import { HeadlineService } from 'src/app/services/headline.service';

/** Component that shows the headlines saved as favorites. */
@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css'],
})
export class FavsComponent implements OnInit {
  /** List of headlines saved as favorites. */
  public headlines: Headline[] = [];

  constructor(private headlineService: HeadlineService) {}

  /** @ignore */
  ngOnInit(): void {
    this.headlines = this.headlineService.getSavedPosts() || [];
  }
}
