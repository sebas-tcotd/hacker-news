/** Response interface for the Hacker News endpoint. */
export interface NewsResponse {
  /** List of news */
  hits: News[];
}

export interface News {
  /** Date of creation of the news */
  created_at: Date;

  /** Author of the news */
  author: string;

  /** Title of the news */
  story_title: string;

  /** URL of the news */
  story_url: null | string;

  /** ID of the news */
  created_at_i: number;
}
