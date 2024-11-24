// 1. При відправці запиту (POST) треба перевірити че є тіло і який тип (по заголовку) app.use(express.json());
console.log("Git-3_1_serv app.js");


const express = require("express");
const app = express();

// const logger = require("morgan");
// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// app.use(logger(formatsLogger));

const booksRouter = require("./routes/api/books");
// const contactsRouter = require("./routes/api/contacts");


const cors = require("cors");
app.use(cors()); // Вирішує крос адресацію (різні адреси)

app.use(express.json()); // Перевіряє чи є у запиті (POST) тіло і який тип по заголовку

app.use("/api/books", booksRouter);
// app.use("/api/contacts", contactsRouter);


//  == Функція обробник запиту на адресу якої немає
app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
})

//  == Функція обробник помилок
app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err; 
    res.status(status).json({ message, })
})


// app.listen(3000, ()=> {
//     console.log("Server run");
// })

module.exports = app;