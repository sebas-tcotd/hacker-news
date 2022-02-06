import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../models/news-response.interface';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private url: string = environment.newsURLBase;
  private frameworkWord = new Subject<string>();
  newsPage = 0;
  favorites: Post[] =
    JSON.parse(localStorage.getItem('saved-posts') as string) || [];

  constructor(private http: HttpClient) {}

  search$ = this.frameworkWord.asObservable();

  setSearch(keyword: string): void {
    this.frameworkWord.next(keyword);
  }

  /**
   * Recover all the news about the frameworks Angular, React and Vue.
   * @param framework The name of the framework to be searched.
   * @returns An array with all the news.
   */
  getNews(framework?: string): Observable<Post[]> {
    const params = new HttpParams().set('query', `${framework}`).set('page', 0);

    return this.http
      .get<NewsResponse>(`${this.url}/search_by_date`, { params })
      .pipe(
        map((response) =>
          response.hits
            .filter(
              (element) =>
                element.created_at &&
                element.author &&
                element.story_title &&
                element.story_url
            )
            .map((newsElement) => ({
              created_at: newsElement.created_at.toString(),
              author: newsElement.author,
              story_title: newsElement.story_title,
              story_url: newsElement.story_url!,
              story_id: newsElement.created_at_i,
              is_favorite: false,
            }))
        ),
        tap((news) => {
          this.favorites = JSON.parse(
            localStorage.getItem('saved-posts') as string
          );

          news.forEach((singleNews) => {
            const isTheNewSaved: boolean = this.favorites.some(
              (favorite) => favorite.story_id === singleNews.story_id
            );
            if (isTheNewSaved) {
              singleNews.is_favorite = true;
            }
          });
        })
      );
  }
}
