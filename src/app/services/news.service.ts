import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { News, NewsResponse } from '../models/news-response.interface';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  public isPageLoading: boolean = false;
  public favorites: Post[] =
    JSON.parse(localStorage.getItem('saved-posts') as string) || [];
  private frameworkWordSource = new Subject<string>();
  private url: string = environment.newsURLBase;
  private newsPage = 0;
  public search$ = this.frameworkWordSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Recover all the news about the frameworks Angular, React and Vue.
   * @param framework The name of the framework to be searched.
   * @returns An array with all the news.
   */
  getNews(framework?: string): Observable<Post[]> {
    if (this.isPageLoading) {
      return of([]);
    }

    this.startLoad();

    const params = new HttpParams()
      .set('query', `${framework || localStorage.getItem('framework-filter')}`)
      .set('page', this.newsPage.toString());

    return this.http
      .get<NewsResponse>(`${this.url}/search_by_date`, { params })
      .pipe(
        map((response) =>
          response.hits.filter(this.filterByModel).map(this.transformToModel)
        ),
        tap((news) => {
          this.endLoad();
          this.checkSavedFavorites(news);
        })
      );
  }

  private filterByModel = (element: News): string | null =>
    element.created_at &&
    element.author &&
    element.story_title &&
    element.story_url;

  private transformToModel = (newsElement: News): Post => ({
    created_at: newsElement.created_at.toString(),
    author: newsElement.author,
    story_title: newsElement.story_title,
    story_url: newsElement.story_url!,
    story_id: newsElement.created_at_i,
    is_favorite: false,
  });

  private endLoad(): void {
    this.isPageLoading = false;
    this.newsPage += 1;
  }

  private startLoad(): void {
    this.isPageLoading = true;
  }

  private checkSavedFavorites = (news: Post[]): void => {
    this.favorites = JSON.parse(localStorage.getItem('saved-posts') as string);

    if (this.favorites) {
      news.forEach((singleNews) => {
        const isTheNewSaved: boolean = this.favorites.some(
          (favorite) => favorite.story_id === singleNews.story_id
        );
        if (isTheNewSaved) {
          singleNews.is_favorite = true;
        }
      });
    }
  };

  public resetNewsPage(): void {
    this.newsPage = 0;
  }

  public setSearch(keyword: string): void {
    this.frameworkWordSource.next(keyword);
  }
}
