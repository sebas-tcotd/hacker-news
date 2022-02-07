import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class HeadlineService {
  private _savedPosts: Post[] = [];

  constructor() {}

  public saveAsFavorite(post: Post): void {
    const posts: Post[] = this.getSavedPosts();

    const isPostAlreadySaved: boolean = posts.some(
      (savedPost) => savedPost.story_id === post.story_id
    );

    if (isPostAlreadySaved) return;

    post.is_favorite = true;

    this._savedPosts = [...posts, post];
    localStorage.setItem('saved-posts', JSON.stringify(this._savedPosts));
  }

  public removeFavorite(post: Post): void {
    const posts: Post[] = this.getSavedPosts();

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

  public getSavedPosts(): Post[] {
    const posts = localStorage.getItem('saved-posts') || '[]';
    return JSON.parse(posts);
  }
}
