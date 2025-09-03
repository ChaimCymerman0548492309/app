import express from "express";
import fetch from "node-fetch";
import router from "./router";
import { Book } from "./types/types";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  showMenu();
});

function showMenu() {
  process.stdout.write(
    "\n Enter input:\n * 1 for search book,\n * 2 for borrow a book by bookID,\n * 3 to return book by bookID,\n> "
  );

  process.stdin.once("data", async (data) => {
    const answer = data.toString().trim();

    if (answer === "1") {
      process.stdout.write(" Enter book name: ");
      process.stdin.once("data", async (data) => {
        const bookName = data.toString().trim();
        try {
          const response = await fetch(`http://localhost:${port}/${bookName}`);
          const result = await response.json();
          if (!result.length) {
            console.log("No books found with that name.");
          } else {
            result.forEach((book: Book) => {
              console.log(
                `bookID is : ${book.bookId}, \n book name : ${book.name} \n outhor : ${book.outhor}, \n Status: ${book.bookStatus}`
              );
            });
          }
        } catch (error) {
          console.error("Error fetching book by name:", error);
        }
        showMenu();
      });
    } else if (answer === "2") {
      process.stdout.write(" Enter bookID to borrow: ");
      process.stdin.once("data", async (data) => {
        const bookID = data.toString().trim();
        try {
          await fetch(
            `http://localhost:${port}/borrow/${bookID}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
          );
        
        } catch (error) {
          console.error("Error borrowing book:", error);
        }
        showMenu();
      });
    } else if (answer === "3") {
      process.stdout.write(" Enter bookID to return: ");
      process.stdin.once("data", async (data) => {
        const bookID = data.toString().trim();
        try {
          await fetch(`http://localhost:${port}/return/${bookID}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Error returning book:", error);
        }
        showMenu();
      });
    } else {
      console.log("Invalid , try again!");
      showMenu();
    }
  });
}
