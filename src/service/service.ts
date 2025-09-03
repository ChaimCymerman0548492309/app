import fs from "fs/promises";
import path from "path";
import { Book, Repository } from "../types/types";

export class Service implements Repository<Book> {
  private DATA_FILE: string;

  constructor(filePath = path.join(__dirname, "../data/data.json")) {
    this.DATA_FILE = filePath;
  }

  private async load(): Promise<ReadonlyArray<Book>> {
    try {
      const raw = await fs.readFile(this.DATA_FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private async save(data: Book[]): Promise<void> {
    try {
      await fs.writeFile(this.DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing data file:", error);
      throw error;
    }
  }

  // async getAll(): Promise<ReadonlyArray<Book[]>> {
  //   return this.load();
  // }

  async getBookByName(name: string): Promise<Book[] | null> {
    const data = await this.load();
    const books: Book[] = [];
    data.forEach((b) => {
      if (b.name === name) {
        books.push(b);
      }
    });
    return books;
  }

  async borrow(bookID: string): Promise<Book | null | string> {
    const loaded = await this.load();
    const all = [...loaded];
    const index = all.findIndex((i) => i.bookId === bookID);
    if (index === -1 ) {
      console.log("Book not found");
      return null;
    } 
     if  (all[index].bookStatus === "on-lone") {
      console.log(`${all[index].name} is already on-lone`);
      return null;
     }
    
    all[index] = {
      ...all[index],
      borrowesAt: new Date(),
      bookStatus: "on-lone",
    };
    try {
      await this.save(all);
    } catch {
      return null;
    }
    console.log(`${all[index].name} borrowed successfully`);
    
    return all[index];
  }
  async returnBook(bookID: string): Promise<Book | null> {
    const loaded = await this.load();
    const all = [...loaded];
    const index = all.findIndex((i) => i.bookId === bookID);
    if (index === -1) {
      console.log("Book not found");
      return null;
    } 
    if (all[index].bookStatus === "available") {
      console.log(`${all[index].name} is already available`);
      return null;
    }
    all[index] = {
      ...all[index],
      borrowesAt: null,
      bookStatus: "available",
    };
    try {
      await this.save(all);
    } catch {
      return null;
    }
    console.log(`${all[index].name} returned successfully`);
    return all[index];
  }
}
