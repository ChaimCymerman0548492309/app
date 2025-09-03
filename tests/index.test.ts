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


// if (answer === "1") {
    
//     const bookName = prompt("Enter book name: ");
//     const res = await fetch(`http://localhost:${port}/${bookName}`);
//     const data = await res.json();
//     console.log("Book search result:", data);
//   } else if (answer === "2") {
//     const bookId = prompt("Enter book ID to borrow: ");
//     const res = await fetch(`http://localhost:${port}/borrow`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ bookId }),
//     });
//     const data = await res.json();
//     console.log("Borrow result:", data);
//   } else if (answer === "3") {
//     const bookId = prompt("Enter book ID to return: ");
//     const res = await fetch(`http://localhost:${port}/return`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ bookId }),
//     });
//     const data = await res.json();
//     console.log("Return result:", data);
//   } else {
//     console.log("Invalid input.");
//   }