

---

# 📦 Service – JSON Repository

##  Overview

This project provides a simple **CRUD service** that manages `Item` objects stored in a JSON file.
It is a lightweight replacement for a database, perfect for testing, prototypes, or small apps.

---

##  **Installation Guide (Local Setup)**

```bash
git clone https://github.com/ChaimCymerman0548492309/app
cd server

npm install

npm run dev
```

---

## 🗂️ **Types**

```ts
Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
```

---

##  **API (Service Methods)**

| Method             | Params                      | Response       | Description          |
| ------------------ | --------------------------- | -------------- | -------------------- |
| `getAll()`         | –                           | `Item[]`       | Get all items        |
| `getById(id)`      | `id: string`                | `Item \| null` | Get item by ID       |
| `create(data)`     | `Partial<Item>`             | `Item`         | Create new item      |
| `update(id, data)` | `id: string, Partial<Item>` | `Item \| null` | Update existing item |
| `delete(id)`       | `id: string`                | `boolean`      | Delete item by ID    |

---

<!-- ## **Storage**

All data is stored in a local JSON file:

```
/server/src/service/data.json
```

--- -->

##  **Tests (Examples)**

| Action | Input                                  | Expected Result                         |
| ------ | -------------------------------------- | --------------------------------------- |
| Create | `{ name: "Test", description: "..." }` | Returns new `Item` with id + timestamps |
| GetAll | –                                      | Returns array of items                  |
| Update | `id, { name: "Updated" }`              | Returns updated `Item`                  |
| Delete | `id`                                   | Returns `true` if deleted, else false   |

<!-- ---

##  Notes

* Data is stored in JSON (later can be migrated to MongoDB).
* IDs are generated using `Date.now()`.
* All items include `createdAt` and `updatedAt`.

--- -->

