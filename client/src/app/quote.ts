export type NewQuote = Omit<Quote, 'id'>;

export interface Quote {
  id: number;
  quoteText: string;
  source: string;
}
