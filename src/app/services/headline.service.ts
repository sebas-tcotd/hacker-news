import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class HeadlineService {
  private _savedPosts: Post[] = [];

  constructor() {}

  savePost(post: Post) {
    const isPostAlreadySaved: boolean = this._savedPosts.some(
      (savedPost) => savedPost.story_id === post.story_id
    );

    if (isPostAlreadySaved) return;

    post.is_favorite = true;

    this._savedPosts = [...this._savedPosts, post];
    localStorage.setItem('saved-posts', JSON.stringify(this._savedPosts));
  }

  getSavedPosts() {
    const posts = localStorage.getItem('saved-posts') as string;
    return JSON.parse(posts);
  }
}
