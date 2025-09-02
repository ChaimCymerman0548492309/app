import { Request, Response } from "express";
import { Service } from "../service/service";
import { CreateItemDTO, UpdateItemDTO, Item } from "../types/types";

export class Controller {
  private repo: Service;

  constructor(repo: Service) {
    this.repo = repo;
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const items = await this.repo.getAll();
      res.json(items);
    } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ error: "Failed to load items" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const item = await this.repo.getById(req.params.id);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    } catch (err) {
      console.error("getById error:", err);
      res.status(500).json({ error: "Failed to load item" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const dto: CreateItemDTO = req.body;
      const newItem = await this.repo.create(dto);
      res.status(201).json(newItem);
    } catch (err) {
      console.error("create error:", err);
      res.status(500).json({ error: "Failed to create item" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const dto: UpdateItemDTO = req.body;
      const updated = await this.repo.update(req.params.id, dto);
      if (!updated) return res.status(404).json({ error: "Item not found" });
      res.json(updated);
    } catch (err) {
      console.error("update error:", err);
      res.status(500).json({ error: "Failed to update item" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const ok = await this.repo.delete(req.params.id);
      if (!ok) return res.status(404).json({ error: "Item not found" });
      res.json({ status: "ok" });
    } catch (err) {
      console.error("delete error:", err);
      res.status(500).json({ error: "Failed to delete item" });
    }
  };
}
