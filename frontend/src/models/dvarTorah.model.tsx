export interface DvarTorahResult {
  title: string;
  content: string;
}

export interface ResultsSectionProps {
  title: string;
  content: string;
  parasha?: string;
  commentator?: string;
  onCreateNew?: () => void;
}
