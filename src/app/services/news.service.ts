import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { News, NewsResponse } from '../models/news-response.interface';
import { Headline } from '../models/post.model';

/** Service that handles requests with the HackerNews API. */
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  /** Property that determines if the page is loading the request. */
  public isPageLoading: boolean = false;

  /** Property that has the headlines saved as favorite. */
  public favorites: Headline[] =
    JSON.parse(localStorage.getItem('saved-posts') as string) || [];

  /** Subject that emits the framework word to the components that requires it. */
  private frameworkWordSource = new Subject<string>();

  /** The URL base of the Hacker News API. */
  private url: string = environment.newsURLBase;

  /** The page value for the parameter of the endpoint. */
  private newsPage = 0;

  /** The observable of the frameworkWord Subject */
  public search$ = this.frameworkWordSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Recover all the news about the frameworks Angular, React and Vue.
   * @param framework The name of the framework to be searched.
   * @returns An array with all the news.
   */
  getNews(framework?: string): Observable<Headline[]> {
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

  /**
   * Filters the news according to the model.
   * @param element The news to be filtered.
   * @returns The news with the required properties existing.
   */
  private filterByModel = (element: News): string | null =>
    element.created_at &&
    element.author &&
    element.story_title &&
    element.story_url;

  /**
   * Transforms the news from the request into a headline to be consumed.
   * @param newsElement The filtered news from the request.
   * @returns The news transformed in the Headline Model.
   */
  private transformToModel = (newsElement: News): Headline => ({
    created_at: newsElement.created_at.toString(),
    author: newsElement.author,
    story_title: newsElement.story_title,
    story_url: newsElement.story_url!,
    story_id: newsElement.created_at_i,
    is_favorite: false,
  });

  /** Stops the request load sign. */
  private endLoad(): void {
    this.isPageLoading = false;
    this.newsPage += 1;
  }

  /** Starts the load sign of the request. */
  private startLoad(): void {
    this.isPageLoading = true;
  }

  /**
   * Checks if the headlines in the home page are labeled as favorite.
   * @param headline The headline to be checked.
   */
  private checkSavedFavorites = (headline: Headline[]): void => {
    this.favorites = JSON.parse(localStorage.getItem('saved-posts') as string);

    if (this.favorites) {
      headline.forEach((singleNews) => {
        const isTheNewSaved: boolean = this.favorites.some(
          (favorite) => favorite.story_id === singleNews.story_id
        );
        if (isTheNewSaved) {
          singleNews.is_favorite = true;
        }
      });
    }
  };

  /** Restarts the page parameter. */
  public resetNewsPage(): void {
    this.newsPage = 0;
  }

  /**
   * Emits the framework word to be consumed by the components that requires it.
   * @param frameworkWord The word to be searched.
   */
  public setSearch(frameworkWord: string): void {
    this.frameworkWordSource.next(frameworkWord);
  }
}
