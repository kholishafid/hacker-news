export interface HackerNewsComment {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
  author: string;
  text: string | null;
  points: number;
  parent_id: number | null;
  story_id: number | null;
  children?: HackerNewsComment[];
}

export interface StoryTypesInterface {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
  author: string;
  title: string;
  url: string | undefined;
  text: string | undefined;
  points: number;
  parent_id: number | undefined;
  story_id: number | undefined;
  children?: HackerNewsComment[];
}
