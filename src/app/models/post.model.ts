/** Model of the headline */
export interface Headline {
  /** Author of the headline */
  author: string;

  /** Title of the headline */
  story_title: string;

  /** URL of the headline */
  story_url: string;

  /** Date of creation of the headline */
  created_at: string;

  /** URL of the headline */
  story_id: number;

  /** Property indicating whether the holder is a favorite */
  is_favorite?: boolean;
}
