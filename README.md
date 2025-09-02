מ
---

# 📦 Service – JSON Repository

## Overview

This project provides a simple **CRUD service** that handles `Item` objects saved in a JSON file.
It's a super light replacement for a database, good for testing, small prototypes, or simple apps.

---

## **Installation Guide (Local Setup)**

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
  description?: string;
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

## **API (Service Methods)**

| Method             | Params                      | Response       | Description           |
| ------------------ | --------------------------- | -------------- | --------------------- |
| `getAll()`         | –                           | `Item[]`       | Return all items      |
| `getById(id)`      | `id: string`                | `Item \| null` | Return one item by ID |
| `create(data)`     | `Partial<Item>`             | `Item`         | Add new item          |
| `update(id, data)` | `id: string, Partial<Item>` | `Item \| null` | Update an item        |
| `delete(id)`       | `id: string`                | `boolean`      | Delete item by ID     |

---

<!-- ## **Storage**  

All data is stored in a local JSON file:

```
/server/src/service/data.json
```

--- -->

## **Error Handling**

| Method / Action       | Behavior / Response                                          |
| --------------------- | ------------------------------------------------------------ |
| `getById`             | Returns `null` if the ID does not exist                      |
| `update`              | Returns `null` if trying to update a non-existent item       |
| `delete`              | Returns `false` if the item does not exist                   |
| All controller routes | Catch errors and return **HTTP 500** with `{ error: "..." }` |

---

## **Tests / Example Usage**

| Action | Input                                  | Expected Result                         |
| ------ | -------------------------------------- | --------------------------------------- |
| Create | `{ name: "Test", description: "..." }` | Returns new `Item` with id + timestamps |
| GetAll | –                                      | Returns array of all items              |
| Update | `id, { name: "Updated" }`              | Returns updated `Item`                  |
| Delete | `id`                                   | Returns `true` if deleted, else false   |

---

## **High-Level Design (HLD)**

You can check the overall architecture here:
[HLD Diagram](https://www.diagrams.net/) *(replace with your actual diagram file or link)*

---

<!-- ## Notes  

* Data is stored in JSON (later can be migrated to MongoDB).  
* IDs are generated using `uuid`.  
* All items include `createdAt` and `updatedAt`.  

--- -->

---
