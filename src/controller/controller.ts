import { Request, Response } from "express";
import { Service } from "../service/service";

export class Controller {
  private repo: Service;

  constructor(repo: Service) {
    this.repo = repo;
  }

  // getAll = async (req: Request, res: Response) => {
  //   try {
  //     const items = await this.repo.getAll();
  //     res.json(items);
  //   } catch (err) {
  //     console.error("getAll error:", err);
  //     res.status(500).json({ error: "Failed to load items" });
  //   }
  // };

  getBookByName = async (req: Request, res: Response) => {
    try {
      const book = await this.repo.getBookByName(req.params.bookByNAme);
      if (!book) return res.status(404).json({ error: "book not found" });
      res.json(book);
    } catch (err) {
      console.error("getBookByNAme error:", err);
      res.status(500).json({ error: "Failed to load books from DB" });
    }
  };

  borrow = async (req: Request, res: Response) => {
    try {
      const book = await this.repo.borrow(req.params.bookID);
      if (!book) return res.status(404).json({ error: "book not found or it is already on-lone" });
    res.status(201).json(`book is borrowed successfully`);
    } catch (err) {
      console.error("create error:", err);
      res.status(500).json({ error: "Failed to borrow book" });
    }
  };
returnBook = async (req: Request, res: Response) => {
    try {
      const book = await this.repo.returnBook(req.params.bookID);
      res.status(201).json(`${book?.name} of the outhor ${book?.outhor} returned successfully`);
    } catch (err) {
      console.error("create error:", err);
      res.status(500).json({ error: "Failed to return book" });
    }
  };
}