export interface BacklogItem {
  id: string;
  name: string;
  tags: string[];
  priority: number;
  created: number;
  done: boolean;
}
