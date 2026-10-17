export const READING_STATUSES = ['ToRead', 'Reading', 'Read'] as const;

export type ReadingStatus = (typeof READING_STATUSES)[number];

export type NewBook = Omit<Book, 'id'>;

export interface Book {
  id: number;
  title: string;
  author: string;
  yearPublished: number;
  status: ReadingStatus;
}
