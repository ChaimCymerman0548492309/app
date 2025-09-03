export interface Book {
  readonly bookId: string;
  name: string;
  year: number;
  outhor: string;
  description: string;
  readonly createdAt: string;
  borrowesAt: Date | null;
  maxBorrowDays: number | null;
  bookStatus: "available" | "on-lone" | "reserved" | "lost/damaged";
}

export interface Repository<T> {
  getBookByName(name: string): Promise<T[] | null | string>;
  borrow(bookID: string): Promise<T | null | string>;
  returnBook(bookID: string): Promise<T | null | string>;
  // getAll(): Promise<ReadonlyArray<T[]>>;
}
