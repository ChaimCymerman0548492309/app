<!-- מ
---

# 📦 Service – JSON Repository

## Overview -->

<!-- This project provides a simple **CRUD service** that handles `Item` objects saved in a JSON file.
It's a super light replacement for a database, good for testing, small prototypes, or simple apps. -->

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
}
```

---

## **API (Service Methods)**

| Method             | Params                      | Response       |            |
| ------------------ | --------------------------- | -------------- | --------------------- |
| `getBookByName()`         |            `name: string`               | `Book[]`       |       |
| `borrow(bookID)`      | `bookID: string`                | `Book ` |  |
| `returnBook(bookID)`     | `bookID: string`             | `Book`         |          |


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
| `getBookByName`             | "No books found with that name."                      |
| `/borrow/:bookID`              | is already on-lone      |
| `/return/:bookID`              | is already availablet                   |

---

<!-- ## **Tests / Example Usage**

| Action | Input                                  | Expected Result                         |
| ------ | -------------------------------------- | --------------------------------------- |
| Create | `{ name: "Test", description: "..." }` | Returns new `Item` with id + timestamps |
| GetAll | –                                      | Returns array of all items              |
| Update | `id, { name: "Updated" }`              | Returns updated `Item`                  |
| Delete | `id`                                   | Returns `true` if deleted, else false   |

--- -->

<!-- ## **High-Level Design (HLD)**

You can check the overall architecture here:
[HLD Diagram](https://www.diagrams.net/) *(replace with your actual diagram file or link)*

--- -->

<!-- ## Notes  

* Data is stored in JSON (later can be migrated to MongoDB).  
* IDs are generated using `uuid`.  
* All items include `createdAt` and `updatedAt`.  

--- -->

---
