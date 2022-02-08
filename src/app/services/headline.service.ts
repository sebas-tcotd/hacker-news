import { Injectable } from '@angular/core';
import { Headline } from '../models/post.model';

/** Service that provides functionalities for headlines. */
@Injectable({
  providedIn: 'root',
})
export class HeadlineService {
  /** Headlines saved as favorites. */
  private _savedHeadlines: Headline[] = [];

  /**
   * Saves the headline as a favorite.
   * @param headline The headline to be saved as favorite.
   */
  public saveAsFavorite(headline: Headline): void {
    const posts: Headline[] = this.getSavedPosts();

    const isPostAlreadySaved: boolean = posts.some(
      (savedPost) => savedPost.story_id === headline.story_id
    );

    if (isPostAlreadySaved) return;

    headline.is_favorite = true;

    this._savedHeadlines = [...posts, headline];
    localStorage.setItem('saved-posts', JSON.stringify(this._savedHeadlines));
  }

  /**
   * Removes a headline from favorites.
   * @param post The headline to be removed.
   */
  public removeFavorite(post: Headline): void {
    const posts: Headline[] = this.getSavedPosts();

    const isThePostFavorite = posts.find(
      (savedPost) => savedPost.story_id === post.story_id
    );

    if (!isThePostFavorite) return;

    const indexOfFavorite = posts.indexOf(isThePostFavorite);
    const newSavedPosts = [
      ...posts.slice(0, indexOfFavorite),
      ...posts.slice(indexOfFavorite + 1),
    ];
    localStorage.setItem('saved-posts', JSON.stringify(newSavedPosts));
    post.is_favorite = false;
  }

  /**
   * Obtains the headline stored in LocalStorage.
   * @returns The list of headlines stored in LocalStorage.
   */
  public getSavedPosts(): Headline[] {
    const posts = localStorage.getItem('saved-posts') || '[]';
    return JSON.parse(posts);
  }
}
