
console.log("Start index.js");
const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const booksPath = path.join(__dirname, "books.json");// ??
console.log(`booksPath: ${booksPath}`);
// console.log(__dirname);



const getAll = async () => {
    // const data = await fs.readFile("./books.json", "utf-8"); // 1 Те саме
    // const data = await fs.readFile(`${__dirname}/books.json`, "utf-8"); // Те саме
    // const data = await fs.readFile("C:\Users\user\Documents\node-projects\NodejsMyProjects\Less_01_2_nodejs\books\books.json", "utf-8");console.log(data); // 2 Те саме
    // const data = await fs.readFile(booksPath, "utf-8"); // 3 Те саме
    const data = await fs.readFile(booksPath); // 4 Те саме
    // console.log(data);
    return JSON.parse(data);
}

const getById = async (id) => {
    const books = await getAll(); 
    const result = books.find(item => item.id === id); // 4
    // console.log(result);
    return result || null;
}

const add = async (data) => {
    const books = await getAll();
    const newBook = {
        id: nanoid(),
        ...data,
    }
    books.push(newBook);
    // await fs.writeFile(booksPath, JSON.stringify(books)); // JSON В одну строку
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2)); // JSON нормальний
    return newBook;
}

const updateById = async (id, data) => {
    const bookId = String(id);
    const books = await getAll();
    const index = books.findIndex(item => item.id === bookId);
    if(index === -1) {
        return null;
    }
    books[index] = {id, ...data};
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return books[index];
}

const deleteById = async (id) => {
    const books = await getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1) {
        return null;
    }
    const [result] = books.splice(index, 1);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return result;
}


const myTestSum = (x, y) => {
    return x + y;
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    myTestSum,
}



// // === Так не працює
// const getAll = () => {
//     const data = fs.readFile(booksPath); // 4
//     return JSON.parse(data);
// }
// // === Так не працює
