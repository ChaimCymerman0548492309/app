import fs from "fs/promises";
import path from "path";
import { Item, Repository, CreateItemDTO, UpdateItemDTO } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export class Service implements Repository<Item> {
  private DATA_FILE: string;

  constructor(filePath = path.join(__dirname, "data.json")) {
    this.DATA_FILE = filePath;
  }

  private async load(): Promise<ReadonlyArray<Item>> {
    try {
      const raw = await fs.readFile(this.DATA_FILE, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private async save(data: Item[]): Promise<void> {
    try {
      await fs.writeFile(this.DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing data file:", error);
      throw error;
    }
  }

  async getAll(): Promise<ReadonlyArray<Item>> {
    return this.load();
  }

  async getById(id: string): Promise<Item | null> {
    const data = await this.load();
    return data.find(i => i.id === id) || null;
  }

  async create(data: CreateItemDTO): Promise<Item> {
    const all = [...await this.load()];
    const newItem: Item = {
      id: uuidv4(),
      name: data.name || "Untitled",
      description: data.description || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    all.push(newItem);
    await this.save(all);
    return newItem;
  }

  async update(id: string, data: UpdateItemDTO): Promise<Item | null> {
    const loaded = await this.load();
    const all = [...loaded];
    const index = all.findIndex(i => i.id === id);
    if (index === -1) return null;
    all[index] = {
      ...all[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    try {
      await this.save(all);
    } catch {
      return null;
    }
    return all[index];
  }

  async delete(id: string): Promise<boolean> {
    const all = await this.load();
    const filtered = all.filter(i => i.id !== id);
    if (filtered.length === all.length) return false;
    try {
      await this.save(filtered);
    } catch {
      return false;
    }
    return true;
  }
}
