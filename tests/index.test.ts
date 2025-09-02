import { Item } from "../src/types/types";
import fs from "fs/promises";
import path from "path";
import { Service } from "../src/service/service";

let service: Service;
let createdId: string; 
const DATA_FILE = path.join(__dirname, "testData.json");

beforeAll(async () => {

  await fs.writeFile(DATA_FILE, "[]", "utf-8");
  service = new Service(DATA_FILE);
});

describe("Full CRUD flow on the same item", () => {
  it("creates a new item", async () => {
    const created = await service.create({ name: "Test Item", description: "Hello" });
    expect(created.id).toBeDefined();
    expect(created.name).toBe("Test Item");

    createdId = created.id; 

    const fetched = await service.getById(createdId);
    expect(fetched).not.toBeNull();
    expect(fetched!.description).toBe("Hello");
  });

  it("updates the same item", async () => {
    const updated = await service.update(createdId, { name: "Updated Name" });
    expect(updated).not.toBeNull();
    expect(updated!.name).toBe("Updated Name");

    const fetched = await service.getById(createdId);
    expect(fetched).not.toBeNull();
    expect(fetched!.name).toBe("Updated Name");
  });

  it("deletes the same item", async () => {
    const success = await service.delete(createdId);
    expect(success).toBe(true);

    const afterDelete = await service.getById(createdId);
    expect(afterDelete).toBeNull();

    const all = await service.getAll();
    expect(all.length).toBe(0);
  });
});
